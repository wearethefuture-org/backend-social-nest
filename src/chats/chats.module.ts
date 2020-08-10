import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { ChatRepository } from './chat.repository';
import { Chat } from './chats.entity';
import { User } from 'src/users/user.entity';
import { File } from 'src/files/file.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, File, User, ChatRepository]),
  ],
  providers: [ 
    // ChatsGateway,
    ChatsService,
  ],
  controllers: [
    ChatsController
  ],
  exports: [
    ChatsService,
  ]
})
export class ChatsModule {
}
