import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { CreateFileDto } from './dto/files.dto';


@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {
  }
  public async create(id: number, createFileDto: CreateFileDto): Promise<File> {
    return this.fileRepository.save({id, createFileDto});
  }
}
