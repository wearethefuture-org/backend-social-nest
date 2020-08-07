import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { CreateMessageDto, GetMessageDto } from './dto/message.dto';
import { Message } from './messages.entity';
import { MessagesService } from './messages.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messageService: MessagesService,
  ) {
  }

  @Post()
  @ApiCreatedResponse({
    type: Message
  })
  public create(@Body() createMessageDto: CreateMessageDto, @Request() req): Promise<Message> {
    return this.messageService.create(req.user.id, createMessageDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: [Message]
  })
  public find(@Query('chat_id') chat_id: number, @Query() getMessageDto: GetMessageDto): Promise<Message[]> {
    return this.messageService.find(chat_id, getMessageDto);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.update(id, createMessageDto);
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: [Message]
  })
  public findOne(@Param('id') id: number,): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Delete(':id')
  public delete(@Param('id') id: number): Promise<Message> {
    return this.messageService.delete(id);
  }
}
