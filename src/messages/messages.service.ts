import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/message.dto';
import { Message } from './messages.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {
  }

  public async save(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageRepository.save(createMessageDto);
  }

  public async update(id: number, createMessageDto: CreateMessageDto): Promise<UpdateResult> {
    return this.messageRepository.update({id}, createMessageDto);
  }

  public async find(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  public async findOne(id: number): Promise<Message> {
    return this.messageRepository.findOne(id);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this.messageRepository.delete(id);
  }
}
