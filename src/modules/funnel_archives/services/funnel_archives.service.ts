import { Injectable } from '@nestjs/common';
import { CreateFunnelArchiveDto } from '../dto/create-funnel_archive.dto';
import { UpdateFunnelArchiveDto } from '../dto/update-funnel_archive.dto';


@Injectable()
export class FunnelArchivesService {
  create(createFunnelArchiveDto: CreateFunnelArchiveDto) {
    return 'This action adds a new funnelArchive';
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
