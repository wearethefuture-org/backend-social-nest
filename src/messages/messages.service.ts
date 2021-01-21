import { AppGateway } from './../app.gateway';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto, GetMessageDto } from './dto/message.dto';
import { Message } from './messages.entity';
import { Chat } from 'src/chats/chats.entity';
import { GetMessagesFilterDto } from './dto/get-messages-filter.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private gateway: AppGateway,
  ) {}

  public async create(
    userId: number,
    data: CreateMessageDto,
  ): Promise<Message> {
    const chat = await this.chatRepository.findOne({
      where: { id: data.chat_id },
    });
    if (!chat) {
      throw new HttpException(
        `chat with ${data.chat_id} ID does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newMessage = await this.messageRepository.save({
      owner_id: userId,
      ...data,
    });
    this.gateway.wss.emit('message', newMessage);
    return newMessage;
  }

  public async update(
    id: number,
    createMessageDto: Partial<CreateMessageDto>,
  ): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
    });
    if (!message) {
      throw new HttpException(
        `message with this ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.messageRepository.update({ id }, createMessageDto);
    const updatedMessage = await this.messageRepository.findOne({
      where: { id },
    });
    return updatedMessage;
  }

  public async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
    });
    if (!message) {
      throw new HttpException(
        `message with this ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return message;
  }

  public async getAllMessages(
    chat_id: number,
    getMessageDto: GetMessageDto,
  ): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: { chat_id },
      take: getMessageDto.take,
      skip: getMessageDto.skip,
    });
    if (!messages.length) {
      throw new HttpException('Chat is Empty', HttpStatus.NO_CONTENT);
    } else {
      return messages;
    }
  }

  public async getMessagesWithFilters(
    chat_id: number,
    getMessageDto: GetMessageDto,
    filterDto: GetMessagesFilterDto,
  ): Promise<Message[]> {
    const { search } = filterDto;

    let messages = await this.getAllMessages(chat_id, getMessageDto);
    if (search) {
      messages = messages.filter(message =>
        message.text.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (!messages.length) {
      throw new HttpException(
        'Messages matching your search not found',
        HttpStatus.NO_CONTENT,
      );
    }
    return messages;
  }

  public async delete(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
    });
    if (!message) {
      throw new HttpException(
        `message with this ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.messageRepository.delete(id);
    return message;
    // check contrrroles
  }
}
