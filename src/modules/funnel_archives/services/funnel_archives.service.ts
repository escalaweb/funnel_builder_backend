import { CreateFunnelArchiveDto } from '../dto/create-funnel_archive.dto';
import { FunnelArchive_et } from '../entities';
import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionsService, _LoggerService } from '../../../common/services';
import { UpdateFunnelArchiveDto } from '../dto/update-funnel_archive.dto';

import { _response_I } from '../../../common/interfaces';
import { AuthPayload_I } from '../../auth/interfaces';
import * as uuid from 'uuid';
import { ProcessDataService } from '../../../common/adapters';

@Injectable()
export class FunnelArchivesService {

    constructor(
        @InjectRepository(FunnelArchive_et)
        private readonly _FunnelArchive_et_repository: Repository<FunnelArchive_et>,

        private readonly _LoggerService: _LoggerService,

        private readonly _processData: ProcessDataService,

        private readonly _TransactionsService: TransactionsService
    ) {

    }

    async create(createFunnelArchiveDto: CreateFunnelArchiveDto, user: AuthPayload_I, _prev_queryRunner?: QueryRunner): Promise<_response_I<FunnelArchive_et>> {

        let _Response: _response_I<FunnelArchive_et>;

        let queryRunner = await this._TransactionsService.startTransaction(_prev_queryRunner);

        const data_archive: FunnelArchive_et = {
            ...createFunnelArchiveDto[0],
            _id: createFunnelArchiveDto._id || uuid.v4(),
        };

        try {

            let archive = this._FunnelArchive_et_repository.create({
                _id: data_archive._id || uuid.v4(),
                name: data_archive.name,
                config_step_id: data_archive.config_step_id || null,
                user_id: user,
                funnelLibrary_id: data_archive.funnelLibrary_id || null,
                __v: 0
            });

            const resp = await this._processData.process_create<FunnelArchive_et>({
                body: archive,
                entity: FunnelArchive_et,
                queryRunner: queryRunner,
            });

            _Response = resp;

            if (!_prev_queryRunner) this._TransactionsService.commitTransaction(queryRunner);

        } catch (err) {

            _Response = err;

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

    update(id: number, updateFunnelArchiveDto: UpdateFunnelArchiveDto) {
        return `This action updates a #${id} funnelArchive`;
    }

    remove(id: number) {
        return `This action removes a #${id} funnelArchive`;
    }
}
