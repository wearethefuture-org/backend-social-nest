import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository'
import { MulterModule } from '@nestjs/platform-express';
import { FilesService } from '../files/files.service';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    FilesModule,
    TypeOrmModule.forFeature([User, UserRepository]),
    MulterModule.register({
      dest: 'static/uploads',
    }),
  ],
  providers: [
    UsersService,

  ],
  controllers: [
    UsersController,
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule {
}
