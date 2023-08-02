import { Module } from '@nestjs/common';
import { FileManagerController } from './controllers/file-manager.controller';
import { FileManagerService } from './services';

@Module({
  controllers: [FileManagerController],
  providers: [FileManagerService]
})
export class FileManagerModule {}
