import { CreateFunnelArchiveDto } from '../dto/create-funnel_archive.dto';
import { FunnelArchive_et } from '../entities';
import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionsService, _LoggerService } from '../../../common/services';
import { UpdateFunnelArchiveDto } from '../dto/update-funnel_archive.dto';

import { _argsFind_I, _response_I } from '../../../common/interfaces';
import { AuthPayload_I } from '../../auth/interfaces';
import * as uuid from 'uuid';
import { ProcessDataService } from '../../../common/adapters';
import { ConfigPlanner_et } from '../../planner/entities';
import { FunnelLibrary_et } from '../../funnel-library/entities/funnel-library.entity';
import { PlannerService } from '../../planner/services/planner.service';

@Injectable()
export class FunnelArchivesService {

    constructor(
        @InjectRepository(FunnelArchive_et)
        private readonly _FunnelArchive_et_repository: Repository<FunnelArchive_et>,

        @InjectRepository(ConfigPlanner_et)
        private readonly _ConfigPlanner_et_repository: Repository<ConfigPlanner_et>,

        private readonly _LoggerService: _LoggerService,

        private readonly _processData: ProcessDataService,

        private readonly _plannerService: PlannerService,

        private readonly _TransactionsService: TransactionsService
    ) {

    }

    // TODO configurar para el uso de DTO
    async create_archive(data_archive: FunnelArchive_et, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelArchive_et>> {

        let _Response: _response_I<FunnelArchive_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        // const funnelLibrary_id = ;

        try {

            /*        let archive = this._FunnelArchive_et_repository.create({
                       _id: data_archive._id || uuid.v4(),
                       name: data_archive.name,
                       config_step_id: data_archive.config_step_id || null,
                       user_id: user,
                       funnelLibrary_id: data_archive.funnelLibrary_id || null,
                       __v: 0
                   });
        */

            let args: _argsFind_I = {
                findObject: {
                    where: {
                        _id: data_archive.funnelLibrary_id,
                        "user_id._id": user._id
                    },
                },
                populate: {
                    user_id: {
                        select: [
                            "_id",
                            "name",
                            "email",
                        ]
                    }
                }
            }

            let created_FunnelLibrary = await this._processData.process_getOne({
                argsFind: args,
                entity: FunnelLibrary_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);


            let data_configPlanner = await this._ConfigPlanner_et_repository.create({
                dash: {},
                toolsSettingsConfig: [],
                archives_id: null,
                // __v: 0
            })

            let created_config = await this._processData.process_create<ConfigPlanner_et>({
                body: data_configPlanner,
                entity: ConfigPlanner_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);

            let data_archive_created = this._FunnelArchive_et_repository.create({
                name: data_archive.name,
                config_step_id: created_config,
                funnelLibrary_id: created_FunnelLibrary,
                user_id: user,
                __v: 0,
            });

            let created_archive = await this._processData.process_create<FunnelArchive_et>({
                body: data_archive_created,
                entity: FunnelArchive_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);

            // created_config = await this._plannerService.create_configsPlanner({
            //     ...created_config,
            //     archives_id: created_archive
            // }, user, queryRunner).then(({ data }) => data);

            created_config = await this._processData.process_create<ConfigPlanner_et>({
                body: {
                    ...created_config,
                    archives_id: created_archive
                },
                entity: ConfigPlanner_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);

            _Response = {
                ok: true,
                statusCode: 201,
                data: created_archive,
                message: [
                    {
                        text: 'Nuevo archivo creado',
                        type: 'global'
                    }
                ]
            };

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (err) {

            _Response = err;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

    async clone(funnelLibrary_id: string, funnelArchive_id: string, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelArchive_et>> {

        let _Response: _response_I<FunnelArchive_et>;
        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {

            let args: _argsFind_I = {
                findObject: {
                    where: {
                        _id: funnelArchive_id,
                        "funnelLibrary_id._id": funnelLibrary_id,
                        "user_id._id": user._id,
                    },
                    relations: [
                        'funnelLibrary_id',
                        'user_id',
                        'funnels_id',
                        'config_step_id'
                    ]
                },
                populate: {
                    user_id: {
                        select: [
                            "_id",
                            "name",
                            "email",
                        ]
                    }
                }
            }

            let archive_clone = await this._processData.process_getOne<FunnelArchive_et>({
                argsFind: args,
                entity: FunnelArchive_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);


            let created_config = await this._processData.process_create<ConfigPlanner_et>({
                body: this._ConfigPlanner_et_repository.create({
                    ...archive_clone.config_step_id,
                    archives_id: null,
                    _id: uuid.v4(),
                }),
                entity: ConfigPlanner_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);

            let created_archive = await this._processData.process_create<FunnelArchive_et>({
                body: this._FunnelArchive_et_repository.create({
                    ...archive_clone,
                    _id: uuid.v4(),
                    name: archive_clone.name + ' - Copia',
                    config_step_id: created_config,
                    __v: 0,
                }),
                entity: FunnelArchive_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);

            created_config = await this._processData.process_create<ConfigPlanner_et>({
                body: {
                    ...created_config,
                    archives_id: created_archive
                },
                entity: ConfigPlanner_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);


            _Response = {
                ok: true,
                statusCode: 201,
                data: created_archive,
                message: [
                    {
                        text: 'Nuevo archivo clonado',
                        type: 'global'
                    }
                ]
            };

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (err) {

            _Response = err;
            console.log(err);
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

    async update(funnelLibrary_id: string, funnelArchive_id: string, body: any, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelArchive_et>> {

        let _Response: _response_I<FunnelArchive_et>;
        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        try {
            let args: _argsFind_I = {
                findObject: {
                    where: {
                        _id: funnelArchive_id,
                        "funnelLibrary_id._id": funnelLibrary_id,
                        "user_id._id": user._id
                    },
                    relations: [
                        'funnelLibrary_id',
                        'user_id',
                    ]
                },
                populate: {
                    user_id: {
                        select: [
                            "_id",
                            "name",
                            "email",
                        ]
                    }
                }
            }

            let created_archive = await this._processData.process_getOne<FunnelArchive_et>({
                argsFind: args,
                entity: FunnelArchive_et,
                queryRunner: queryRunner,
            }).then(({ data }) => data);

            created_archive.name = body.name;

            await this._processData.process_create<FunnelArchive_et>({
                body: created_archive,
                entity: FunnelArchive_et,
                queryRunner: queryRunner,
            }).then(resp => {

                _Response = structuredClone(resp);

                _Response.message = [
                    {
                        text: 'Archivo de embudos actualizado',
                        type: 'global'
                    }
                ]

            });

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (error) {

            _Response = error;
            if (!_prev_queryRunner) this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

    findAll() {
        return `This action returns all funnelArchives`;
    }

    findOne(id: number) {
        return `This action returns a #${id} funnelArchive`;
    }

    // update(id: number, updateFunnelArchiveDto: UpdateFunnelArchiveDto) {
    //     return `This action updates a #${id} funnelArchive`;
    // }

    remove(id: number) {
        return `This action removes a #${id} funnelArchive`;
    }
}
