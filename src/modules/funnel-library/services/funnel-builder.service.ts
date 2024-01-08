import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, QueryRunner } from "typeorm";
import { ProcessDataService, DateProcessService } from "../../../common/adapters";
import { _response_I, _argsFind_I } from "../../../common/interfaces";
import { LoggModel, _LoggerService } from "../../../common/services";
import { TransactionsService } from "../../../database/services/transactions.service";
import { AuthPayload_I } from "../../auth/interfaces";
import { CustomizeProcess_et } from "../../customize-process/entities";
import { FunnelBody_et, FunnelBody_stages_et } from "../../funnels/entities";
import { UsersService } from "../../users/services/users.service";
import { FunnelLibrary_et } from "../entities";
import { FunnelLibraryService } from "./funnel-library.service";

import * as _ from "lodash";
import * as uuid from 'uuid';
import { ConfigPlanner_et } from "../../planner/entities";


@Injectable()
export class FunnelBuilderService {

    constructor(
        @InjectRepository(FunnelBody_et)
        private readonly _FunnelBody_et_repository: Repository<FunnelBody_et>,

        @InjectRepository(FunnelBody_stages_et)
        private readonly _FunnelBody_stages_et_repository: Repository<FunnelBody_stages_et>,

        @InjectRepository(FunnelLibrary_et)
        private readonly _FunnelLibrary_et_repository: Repository<FunnelLibrary_et>,

        @InjectRepository(CustomizeProcess_et)
        private readonly _CustomizeProcess_et_repository: Repository<CustomizeProcess_et>,

        // private readonly _FunnelLibraryService: FunnelLibraryService,
        // private readonly _usersService: UsersService,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,

        private readonly dataSource: DataSource,

        private readonly _LoggerService: _LoggerService,
        private readonly _TransactionsService: TransactionsService,

    ) {

    }

    async create_funnels_v2(funnelLibrary_id: string, dataToSave: FunnelLibrary_et, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelLibrary_et>> {

        let _Response: _response_I<FunnelLibrary_et>;
        let LoggerModels: LoggModel[] = [];

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            const args: _argsFind_I = {
                findObject: {
                    where: {
                        _id: funnelLibrary_id
                    },
                    relations: {
                        config_step_id: true
                    }
                }
            }

            let funnelLibrary: FunnelLibrary_et = await this._processData.process_getOne({
                argsFind: { ...args },
                entity: FunnelLibrary_et,
                queryRunner
            }).then(({ data }) => data);

            let funnels_deleteEty: FunnelBody_et[] = [];
            const funnels_ids: string[] = dataToSave.funnels_id.map(({ _id }) => _id);

            /* Se eliminan embudos que no vienen en el nuevo saving */
            funnels_deleteEty = await this._FunnelBody_et_repository
                .createQueryBuilder('funnels')
                .where('funnels.funnelLibrary_id = :funnelLibrary', { funnelLibrary: funnelLibrary_id })
                .andWhere('funnels._id NOT IN (:...funnelIds)', { funnelIds: funnels_ids })
                .select('funnels')
                .getMany() || [];

            funnels_deleteEty.length > 0 && await queryRunner.manager.delete(FunnelBody_et, funnels_deleteEty).then((resp) => {

                    let funnelsString: any[] = funnels_deleteEty.map((funnel: FunnelBody_et) => {
                        return {
                            _id: funnel._id,
                            Embudo: funnel.name
                        }
                    });

                    LoggerModels.push({
                        type: 'log',
                        context: 'FunnelsService - create_funnels',
                        message: `Usuario ${user.email} - ha eliminado los embudos que no vienen en el guardado`,
                        response: {
                            user: {
                                ...user
                            },
                            body: {
                                embudos: [...funnelsString]
                            }
                        }
                    });


                });
            /*  */

            /* Se eliminan los stages funnels que no vengan en el saving */
            const deleteStages_ids = await this._FunnelBody_stages_et_repository
                .createQueryBuilder('stages_funnel')
                .where('stages_funnel.funnel_id IN (:...funnelIds)', { funnelIds: funnels_ids })
                .select('stages_funnel._id')
                .getMany();

            deleteStages_ids.length > 0 && await queryRunner.manager.delete(FunnelBody_stages_et, deleteStages_ids);
            /*  */

            /* Se re asignan nueva insersion de embudos */
            const aux_funnels_Ety = await this._FunnelBody_et_repository
                .createQueryBuilder('funnels')
                .where('funnels.funnelLibrary_id = :funnelLibrary_id', { funnelLibrary_id })
                .select('funnels')
                .getMany();

            let customizeProcess: CustomizeProcess_et[] = [];
            let funnels: FunnelBody_et[] = dataToSave.funnels_id.map((funnel: FunnelBody_et) => {

                if (aux_funnels_Ety.some(item => item._id === funnel._id)) {



                } else {

                    LoggerModels.push({
                        type: 'log',
                        // message: `Usuario ${user.email} - u: ${user.username_id} - t: ${user.tenant_id} - ha creado un embudo: _id: "${funnel._id}" Embudo: "${funnel.name}"`,
                        message: `Usuario ${user.email} - ha creado un embudo`,
                        response: {
                            user: {
                                ...user
                            },
                            body: {
                                ..._.pick(funnel, ['_id', 'name'])
                            }
                        },
                        context: 'FunnelsService - create_funnels'
                    });

                }

                customizeProcess.push({
                    ...funnel.customizeProcess_step_id,
                    _id: funnel.customizeProcess_step_id._id || uuid.v4()
                });

                return this._FunnelBody_et_repository.create({
                    ...funnel,
                    __v: 1,
                    _id: _.get(funnel, '_id', uuid.v4()),
                    customizeProcess_step_id: null,
                    funnelLibrary_id: funnelLibrary,
                    updatedAt: this._dateService.setDate(),
                });

            });

            let stages: FunnelBody_stages_et[] = [];

            for (const [i, item] of dataToSave.funnels_id.entries()) {

                for (const [_i, _item] of item.stages.entries()) {

                    let aux: FunnelBody_stages_et = this._FunnelBody_stages_et_repository.create({
                        ..._item as FunnelBody_stages_et,
                        _id: _.get(_item, '_id', uuid.v4()),
                        funnel_id: item,
                        __v: 1,
                    });
                    stages.push(aux)

                }

            }

            let aux_ConfigPlanner: ConfigPlanner_et = {
                ...dataToSave.config_step_id,
                _id: funnelLibrary.config_step_id._id || uuid.v4()
            };

            funnelLibrary.funnels_id = null;
            funnelLibrary.updatedAt = this._dateService.setDate();

            await queryRunner.manager.save(FunnelLibrary_et, funnelLibrary);
            await queryRunner.manager.save(ConfigPlanner_et, aux_ConfigPlanner);
            await queryRunner.manager.save(FunnelBody_et, [...funnels]);
            await queryRunner.manager.save(FunnelBody_stages_et, stages);
            await queryRunner.manager.save(CustomizeProcess_et, [...customizeProcess]);

            for (const [i, item] of funnels.entries()) {
                item.customizeProcess_step_id = customizeProcess[i];
            }
            await queryRunner.manager.save(FunnelBody_et, [...funnels]);

              if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

             _Response = {
                ok: true,
                statusCode: 201,
                data: {
                    funnelLibrary_id: funnelLibrary,
                } as any,
                message: [
                    {
                        text: 'Datos de embudos guardados',
                        type: 'global'
                    }
                ]
            }

            this._LoggerService._emitLoggers(LoggerModels);

        } catch (error) {
            console.log(error);
            _Response = error;
           if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);
        }

        return _Response;

    }


}