import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chats.entity';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { User } from 'src/users/user.entity';
import { File } from 'src/files/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, File, User]),
  ],
  providers: [ 
    ChatsGateway,
    ChatsService,
  ],
  controllers: [
    ChatsController
  ],
  exports: [
    ChatsService,
  ]
})
export class ChatsModule {}
