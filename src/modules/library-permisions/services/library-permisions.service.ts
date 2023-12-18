import { Injectable } from '@nestjs/common';
import { AuthPayload_I } from '../../auth/interfaces';
import { _argsFind, _response_I } from '../../../common/interfaces';
import { TransactionsService } from '../../../database/services/transactions.service';
import { ProcessDataService } from '../../../common/adapters';
import { LibraryPermisions_et } from '../entities';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LibraryPermisionsService {

    constructor(
        @InjectRepository(LibraryPermisions_et)
        private readonly _LibraryPermisions_et_repository: Repository<LibraryPermisions_et>,

        private readonly _processData: ProcessDataService,
        private readonly _TransactionsService: TransactionsService,
    ) {

    }

    async findAll_byLibraryId( funnelLibrary_id: string, user: AuthPayload_I ): Promise<_response_I<LibraryPermisions_et[]>> {

        let _Response: _response_I<LibraryPermisions_et[]>;

        try {

        } catch (error) {

            _Response = error;

        }

        return _Response;
    }


    async findOne_byId( libraryPermision_id: string, user: AuthPayload_I ): Promise<_response_I<LibraryPermisions_et>> {

        let _Response: _response_I<LibraryPermisions_et>;

        try {

            let args: _argsFind = {
                findObject: {
                    where: {
                        _id: libraryPermision_id
                    },
                    relations: [
                        'user_id',
                        'funnelLibrary_id'
                    ],
                    select: {
                        user_id: {
                            _id: true,
                            name: true,
                            email: true
                        },
                    }
                },
            }

            await this._processData.process_getOne<LibraryPermisions_et>(this._LibraryPermisions_et_repository, args).then((response) => {

                _Response = response;
                _Response.message = [
                    {
                        text: 'Permisos encontrados',
                        type: 'global'
                    }
                ]

            });

            // this._TransactionsService.commitTransaction(queryRunner);


        } catch (error) {

            _Response = error;
            // this._TransactionsService.rollbackTransaction(queryRunner);

        }

        return _Response;

    }

}
