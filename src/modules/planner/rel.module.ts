import { Module, forwardRef } from "@nestjs/common";
import { FunnelLibraryModule } from '../funnel-library/funnel-library.module';

@Module({
    controllers: [],
    imports: [
        forwardRef( () => FunnelLibraryModule )
        // FunnelLibraryModule

    ],
    providers: [

    ],
    exports: [
        FunnelLibraryModule
        //    forwardRef( () => FunnelLibraryModule )

    ]
})
export class Planner_Rel_Module { }
