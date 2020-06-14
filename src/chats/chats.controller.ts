import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatsService } from './chats.service';
import { Chats } from './chats.entity';
import { CreateChatsDto, GetChatsDto } from './dto/chats.dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
  ) {
  }

  @Post()
  @ApiCreatedResponse({
    type: Chats
  })
  public create(@Body() createChatsDto: CreateChatsDto): Promise<Chats> {
    return this.chatsService.save(createChatsDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: Chats
  })
  /*public find(@Query() getChatsDto: GetChatsDto): Promise<Chats[]> {
    return this.chatsService.find();
  }*/

  @Get(':id')
  @ApiCreatedResponse({
    type: Chats
  })
  public findOne(@Param('id') id: number): Promise<Chats> {
    return this.chatsService.findOne(id);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() createChatsDto: CreateChatsDto): Promise<UpdateResult> {
    return this.chatsService.update(id, createChatsDto);
  }

  @Delete(':id')
  public delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.chatsService.delete(id);
  }
}
