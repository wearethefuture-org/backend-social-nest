import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Any } from 'typeorm';
import { CreateChatDto } from './dto/chat.dto';
import { Chat } from './chats.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { User } from 'src/users/user.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
    @InjectRepository(User)
    private usersRepository : Repository<User>,
  ) {
  }

  public async create(userId: number, data: CreateChatDto): Promise<Chat> {
    return this.chatsRepository.save({owner_id: userId, ...data});
  }

  public async update(id: number, createChatDto: CreateChatDto): Promise<UpdateResult> {
    return this.chatsRepository.update({id}, createChatDto);
  }

  public async find(): Promise<Chat[]> {
    return this.chatsRepository.find();
  }

  public async findOne(id: number): Promise<Chat> {
    return this.chatsRepository.findOne(id);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this.chatsRepository.delete(id);
  }
}
