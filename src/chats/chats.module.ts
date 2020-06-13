import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from './chats.entity';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';


@Module({
  imports: [
    TypeOrmModule.forFeature([Chats]),
  ],
  providers: [
    ChatsService,
    ChatsGateway
  ],
  controllers: [
    ChatsController,
  ],
  exports: [
    ChatsService,
  ],
})
export class ChatsModule {
}
