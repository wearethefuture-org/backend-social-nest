import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { CreateChatDto, GetChatDto } from './dto/chat.dto';
import { Chat} from './chats.entity';
import { ChatsService } from './chats.service';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  @Get()
  @ApiCreatedResponse({
    type: [Chat]
  })
  public find(@Query() getUserDto: GetChatDto): Promise<Chat[]> {
    return this.chatService.find();
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: [Chat]
  })
  public findOne(@Param('id') id: number): Promise<Chat> {
    return this.chatService.findOne(id);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() createChatDto: CreateChatDto): Promise<UpdateResult> {
    return this.chatService.update(id, createChatDto);
  }

  @Delete(':id')
  public delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.chatService.delete(id);
  }
}
