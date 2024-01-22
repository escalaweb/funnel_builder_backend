import { Module } from '@nestjs/common';
import { FunnelLibraryModule } from '../funnel-library/funnel-library.module';




@Module({
    controllers: [],
    imports: [
        // Planner_Rel_Module,
        FunnelLibraryModule
    ],
    providers: [

    ],
    exports: [
        FunnelLibraryModule
    ]
})
export class FunnelArchives_Rel_Module { }
