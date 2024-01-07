import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, EntityRepository, QueryRunner } from "typeorm";

@Injectable()
export class TransactionsService {

    constructor(
        // @EntityRepository() private readonly entityManager: EntityManager,
        private readonly dataSource: DataSource,
    ) { }

    async startTransaction(_prev_queryRunner: QueryRunner = undefined): Promise<QueryRunner> {

        if (_prev_queryRunner && _prev_queryRunner != undefined && _prev_queryRunner != null) return _prev_queryRunner;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return queryRunner;

    }

    async commitTransaction(queryRunner: QueryRunner): Promise<void> {

        // if (_prev_queryRunner && _prev_queryRunner != undefined && _prev_queryRunner != null) return;

        await queryRunner.commitTransaction();
        await queryRunner.release();

    }

    async rollbackTransaction(queryRunner: QueryRunner): Promise<void> {

        // if (_prev_queryRunner && _prev_queryRunner != undefined && _prev_queryRunner != null) return;

        await queryRunner.rollbackTransaction();
        await queryRunner.release();

    }

}
