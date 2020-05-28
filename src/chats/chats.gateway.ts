import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger('ChatsGateway');

  @SubscribeMessage('chats:message')
  handleMessage(@MessageBody() payload: string): void {
    this.server.emit('chats:message', payload);
  }

  afterInit(server: Server): void {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log(`Client connected: ${client.id}`);
  }
}