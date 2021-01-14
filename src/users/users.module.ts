import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository'
import { MulterModule } from '@nestjs/platform-express';
import { File } from '../files/file.entity';
import { ChatsRepository } from 'src/chats/chats.repository';
import { MessagesRepository } from 'src/messages/messages.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository, File, ChatsRepository, MessagesRepository]),
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
