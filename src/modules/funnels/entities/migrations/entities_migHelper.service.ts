import { Injectable } from "@nestjs/common";
import { MigrationService } from "../../../admin_internal/services/migration.service";
import { Funnel_Migs } from "./funnel.migs";



@Injectable()
export class Funnels_migHelperService {

    constructor(
        private readonly _MigrationService: MigrationService
    ){

        this.init_setMigrations();

    }


    init_setMigrations(){

        this._MigrationService.addMigration(Funnel_Migs);

    }


}

