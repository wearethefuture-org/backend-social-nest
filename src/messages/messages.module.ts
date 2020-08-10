import { AppGateway } from './../app.gateway';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Chat } from '../chats/chats.entity';
import { MessagesRepository } from './messages.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Chat, MessagesRepository]),
  ],
  providers: [
    MessagesService,
    AppGateway,
  ],
  controllers: [
    MessagesController,
  ],
  exports: [
    MessagesService,
  ],
})
export class MessagesModule {
}
