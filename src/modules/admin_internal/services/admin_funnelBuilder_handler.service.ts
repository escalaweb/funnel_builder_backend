
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { _response_I, _argsFind } from '../../../common/interfaces';
import { AuthPayload_I } from '../../auth/interfaces';
import { CustomizeProcess_et } from '../../customize-process/entities';
import { FunnelLibrary_et } from '../../funnel-library/entities';
import { FunnelLibraryService } from '../../funnel-library/services/funnel-library.service';
import { FunnelBody_et, FunnelBody_stages_et } from '../../funnels/entities';
import { ConfigPlanner_et } from '../../planner/entities';
import { User_et } from '../../users/entities';
import { UsersService } from '../../users/services/users.service';

import * as uuid from 'uuid';
import * as _ from "lodash";

@Injectable()
export class Admin_FunnelBuilder_handler_Service {

    constructor(
        private readonly _usersService: UsersService,
        private readonly _FunnelLibraryService: FunnelLibraryService,
        private readonly dataSource: DataSource,

        @InjectRepository(ConfigPlanner_et)
        private readonly _ConfigPlanner_et_repository: Repository<ConfigPlanner_et>,

        @InjectRepository(FunnelBody_et)
        private readonly _FunnelBody_et_repository: Repository<FunnelBody_et>,

        @InjectRepository(FunnelBody_stages_et)
        private readonly _FunnelBody_stages_et_repository: Repository<FunnelBody_stages_et>,

        @InjectRepository(CustomizeProcess_et)
        private readonly _CustomizeProcess_et_repository: Repository<CustomizeProcess_et>,

    ) {

    }

    async set_FbData(
        models: {
            data: {
                funnels: FunnelBody_et[],
                config_step: ConfigPlanner_et
            }
        },
        email: string,
        req?: any
    ): Promise<_response_I> {

        let _Response: _response_I;

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {

            const user: AuthPayload_I = await this.get_userData_byEmail(email);

            let funnelLibrary_id: FunnelLibrary_et = (await this._FunnelLibraryService.findAll(1, user).then()).data[0] || null;

            const pos_number: number = _.get(funnelLibrary_id, 'funnels_id.length', 0);

            const config_step_id: string = _.get(funnelLibrary_id, 'config_step_id._id', uuid.v4());

            let funnels: FunnelBody_et[] = models.data.funnels.map((item, idx) => {

                return this._FunnelBody_et_repository.create({
                    ...item,
                    _id: uuid.v4(),
                    name: `${item.name} - [RECUPERADO]`,
                    customizeProcess_step_id: null,
                    funnelLibrary_id: funnelLibrary_id,
                    pos: pos_number + idx,
                })

            });

            let customizeProcess: CustomizeProcess_et[] = models.data.funnels.map((item, idx) => {

                return this._CustomizeProcess_et_repository.create({
                    ...item.customizeProcess_step_id,
                    _id: uuid.v4(),
                    name: `${item.customizeProcess_step_id.name} - [RECUPERADO]`,
                    funnel_id: funnels[idx],
                    pos: pos_number + idx,
                })

            });

            funnelLibrary_id.funnels_id = funnelLibrary_id.funnels_id.concat(funnels);

            if (req.query.configPlanner && Number(req.query.configPlanner) === 1) {

                const configPlanner: ConfigPlanner_et = await this._ConfigPlanner_et_repository.create({
                    _id: config_step_id,
                    dash: null,
                    toolsSettingsConfig: models.data.config_step.toolsSettingsConfig,
                    funnelLibrary_id: funnelLibrary_id,
                })

                funnelLibrary_id.config_step_id = configPlanner;

                await queryRunner.manager.save(ConfigPlanner_et, configPlanner);

            }

            await queryRunner.manager.save(FunnelLibrary_et, funnelLibrary_id);

            await queryRunner.manager.save(CustomizeProcess_et, customizeProcess);

            for (const [i, item] of customizeProcess.entries()) {

                let funnel: FunnelBody_et = structuredClone(funnels[i]);
                funnel.customizeProcess_step_id = item;
                await queryRunner.manager.save(FunnelBody_et, funnel);

            }

            _Response = {
                ok: true,
                statusCode: 201,
                data: {
                    funnelLibrary_id: funnelLibrary_id
                } as any,
                message: [
                    {
                        text: 'Datos de embudos recuperados',
                        type: 'global'
                    }
                ]
            }


            await queryRunner.commitTransaction();
            await queryRunner.release();

        } catch (error) {

            _Response = {
                ok: false,
                statusCode: 400,
                data: null,
                err: error,
                message: [
                    {
                        text: 'Error al recuperar datos de embudos',
                        type: 'global'
                    }
                ]
            }


            await queryRunner.rollbackTransaction();
            await queryRunner.release();



        }

        return _Response;

    }


    async get_userData_byEmail(email: string): Promise<AuthPayload_I> {

        const args: _argsFind<User_et> = {
            findObject: {
                where: {
                    email: email,
                }
            }
        }
        const User_data: User_et = await this._usersService.findOne(args).then(resp => {
            return resp.data;
        });

        let user: AuthPayload_I = {
            _id: User_data._id,
            email: User_data.email,
            name: User_data.name,
            username_id: User_data.username_id,
            tenant_id: User_data.tenant_id,
        }

        return user;

    }

}
