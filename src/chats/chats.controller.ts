
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, Query } from '@nestjs/common';
import { CreateChatDto, GetChatDto } from './dto/chat.dto';
import { Chat} from './chats.entity';
import { ChatsService } from './chats.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { query } from 'express';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatService: ChatsService,
  ) {
  }

  @Post()
  @ApiCreatedResponse({
    type: Chat
  })
  public create(@Body() createChatDto: CreateChatDto, @Request() req) : Promise<Chat> {
    return this.chatService.create(req.user.id, createChatDto);
  }

  // @Get()
  // @ApiCreatedResponse({
  //   type: [Chat]
  // })
  // public getAll(@Query() getChatDto: GetChatDto): Promise<Chat[]> {
  //   return this.chatService.getAllChats();
  // }

  //'getChats()' return all the chats which are associated with the user 
  // provided through 'userID' by the request  
  @Get()
  @ApiCreatedResponse({
    type: [Chat]
  })
  public getChatsOfUser(@Request() req, @Query() getChatDto: GetChatDto): Promise<Chat[]> {
    return this.chatService.getChatsOfUser(req.user.id, getChatDto);
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: [Chat]
  })
  public findOne(@Param('id') id: number): Promise<Chat> {
    return this.chatService.findOne(id);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.update(id, createChatDto);
  }

  @Delete(':id')
  public delete(@Param('id') id: number): Promise<Chat> {
    return this.chatService.delete(id);
  }
}
