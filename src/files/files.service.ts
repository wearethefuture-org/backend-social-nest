import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { User } from '../users/user.entity';


@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private usersRepository: Repository<User>,
  ) {
  }
  public async create(userId: number, file: any): Promise<File> {
  await this.fileRepository.save({name:file.filename, url:file.path});
  const fileId = file.id;
  const updatedUserAvatar = await this.usersRepository.findOne({
    where: { userId }
  });
  if (!updatedUserAvatar) {
    throw new HttpException('User not found ', HttpStatus.BAD_REQUEST);
  }
  return await this.usersRepository.save({avatar_id: fileId});
}
}

