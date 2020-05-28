import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';

@Module({
  providers: [ 
    ChatsGateway
  ],
  controllers: []
})
export class ChatsModule {}
