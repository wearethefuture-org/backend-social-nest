import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    private usersRepository: Repository<User>,
  ) {
  }

  public async create(userId: number, data: CreateChatDto): Promise<Chat> {
    const user = await this.usersRepository.findOne({where: {id: data.partner_id}})
    if (!user) {
      throw new HttpException('partner ID does not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.chatsRepository.save({owner_id: userId, ...data});
  }

  public async update(id: number, createChatDto: Partial <CreateChatDto>): Promise<Chat> {
    const chat = await this.chatsRepository.findOne({
      where: { id }
    });
    if (!chat) {
      throw new HttpException('Chat with this ID not found', HttpStatus.NOT_FOUND);
    }
    this.chatsRepository.update({id}, createChatDto);
    const updatedChat = await this.chatsRepository.findOne({
      where: { id }
    });
    return updatedChat;
  }

  // public async getAllChats(): Promise<Chat[]> {
  //   return this.chatsRepository.find();
  // }

  public async getChatsOfUser(userID: number): Promise<Chat[]> {
    return this.chatsRepository.find({where: {owner_id: userID}});
  }

  public async findOne(id: number): Promise<Chat> {
    const chat = await this.chatsRepository.findOne({
      where: { id }
    });
    if (!chat) {
      throw new HttpException('Chat with this ID not found', HttpStatus.NOT_FOUND);
    }
    return chat;
  }

  public async delete(id: number): Promise<Chat> {
    const chat = await this.chatsRepository.findOne({
      where: { id }
    });
    if (!chat) {
      throw new HttpException('Chat with this ID not found', HttpStatus.NOT_FOUND);
    }
    await this.chatsRepository.delete(id);
    return chat;
  }
}
