import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlannerDto } from '../dto/create-planner.dto';
import { UpdatePlannerDto } from '../dto/update-planner.dto';
import { AuthPayload_I } from '../../auth/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessDataService, DateProcessService } from '../../../common/adapters';
import { ConfigPlanner_et } from '../entities';
import { FunnelBody_et } from '../../funnels/entities';
import { FunnelsService } from '../../funnels/services/funnels.service';
import { _response_I } from '../../../common/interfaces';

@Injectable()

export class PlannerService {

    constructor(

        @InjectRepository(ConfigPlanner_et)
        private readonly _ConfigPlanner_et_repository: Repository<ConfigPlanner_et>,

        // @InjectRepository(FunnelBody_et)
        // private readonly _FunnelBody_et_repository: Repository<FunnelBody_et>,

        // private readonly _funnelService: FunnelsService,

        private readonly _processData: ProcessDataService,
        private readonly _dateService: DateProcessService,

    ) {

    }

    // async create(createPlannerDto: any, user: AuthPayload_I) {

    //     let _Response: _response_I<any>;

    //     // TODO
    //     // 1. Validar que  el funnel_id exista y sea propiedad del usuario
    //     // Mejorar la forma en la que se guardan estos datos
    //     let funnel: FunnelBody_et = {} as FunnelBody_et;

    //     await this._funnelService.findOne(funnel_id, user).then(resp => {
    //         funnel = structuredClone(resp.data);
    //     })

    //     let data_config: any = {
    //         dash: null,
    //         toolsSettingsConfig: createPlannerDto.toolsSettingsConfig!,
    //     }

    //     await this._processData.process_create<ConfigPlanner_et>(this._ConfigPlanner_et_repository, data_config).then(response => {

    //         data_config = response.data;

    //     }, err => {
    //         _Response = err;
    //         console.log('err', err);
    //         throw new HttpException(_Response, _Response.statusCode);
    //     })

    //     let data = {
    //         config_step_id: data_config._id
    //     }

    //     await this._funnelService.update( funnel._id, data, user).then( resp => {

    //         _Response = resp;

    //     } );

    //     return _Response;

    // }

    findAll() {
        return `This action returns all planner`;
    }

    findOne(id: number) {
        return `This action returns a #${id} planner`;
    }

    // update(id: number, updatePlannerDto: UpdatePlannerDto) {
    //     return `This action updates a #${id} planner`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} planner`;
    // }
}
