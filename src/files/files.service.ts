// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { File } from './file.entity';
// import { User } from '../users/user.entity';
//
//
// @Injectable()
// export class FilesService {
//   constructor(
//     @InjectRepository(File)
//     private readonly fileRepository: Repository<File>,
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {
//   }

  // public async create(userId: number, file: any): Promise<File> {
  //   const createAvatar = await this.fileRepository.save({ name: file.filename, url: file.path });
  //   await this.usersRepository.save({id:userId,  avatar_Id: createAvatar });
  //   return createAvatar;
  //
  // }

  // public async create(file: any): Promise<File> {
  //   return  this.fileRepository.save({name:file.filename, url:file.path});
  // }

//}
