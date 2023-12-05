import { Module } from '@nestjs/common';
import { USER_ENTITIES_MODULE } from '../../modules/users/entities/entities.module';
import { CONFIGPLANNER_ENTITIES_MODULE } from '../../modules/planner/entities/entities.module';
import { FUNNELS_ENTITIES_MODULE, FUNNEL_STAGES_ENTITIES_MODULE } from '../../modules/funnels/entities/entities.module';
import { FUNNEL_LIBRARY_ENTITIES_MODULE } from '../../modules/funnel-library/entities/entities.module';
import { CUSTOMIZE_PROCESS_ENTITIES_MODULE } from '../../modules/customize-process/entities/entities.module';
import { FUNNEL_LIBRARY_PERMISIONS_ENTITIES_MODULE } from '../../modules/library-permisions/entities/entities.module';



/**
 * Modulo tipo barrel que importa todos los modulos de entidades postgresql del proyecto
 *
 * @export
 * @class EntitiesModule
 */
@Module({
    imports: [
        USER_ENTITIES_MODULE,
        CONFIGPLANNER_ENTITIES_MODULE,
        FUNNELS_ENTITIES_MODULE,
        FUNNEL_STAGES_ENTITIES_MODULE,
        FUNNEL_LIBRARY_ENTITIES_MODULE,
        CUSTOMIZE_PROCESS_ENTITIES_MODULE,
        FUNNEL_LIBRARY_PERMISIONS_ENTITIES_MODULE
    ],
    exports: [
        USER_ENTITIES_MODULE,
        CONFIGPLANNER_ENTITIES_MODULE,
        FUNNELS_ENTITIES_MODULE,
        FUNNEL_STAGES_ENTITIES_MODULE,
        FUNNEL_LIBRARY_ENTITIES_MODULE,
        CUSTOMIZE_PROCESS_ENTITIES_MODULE,
        FUNNEL_LIBRARY_PERMISIONS_ENTITIES_MODULE
    ]
})
export class EntitiesModule { }
