import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto, GetChatDto } from './dto/chat.dto';
import { Chat } from './chats.entity';
import { User } from 'src/users/user.entity';
import { GetChatsFilterDto } from './dto/get-chats-filter.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async create(data: CreateChatDto): Promise<Chat> {
    const user = await this.usersRepository.findOne({
      where: { id: data.partner_id },
    });
    const chat = await this.chatsRepository.findOne({
      where: { owner_id: data.owner_id, partner_id: data.partner_id },
    });

    if (!user) {
      throw new HttpException(
        'partner ID does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (chat) {
      return chat;
    }

    return await this.chatsRepository.save({ ownerId: data.owner_id, ...data });
  }

  public async update(
    id: number,
    createChatDto: Partial<CreateChatDto>,
  ): Promise<Chat> {
    const chat = await this.chatsRepository.findOne({
      where: { id },
    });
    if (!chat) {
      throw new HttpException(
        'Chat with this ID not found',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.chatsRepository.update({ id }, createChatDto);

    const updatedChat = await this.chatsRepository.findOne({
      where: { id },
    });
    return updatedChat;
  }

  public async getAllChats(
    userId: number,
    getChatDto: GetChatDto,
  ): Promise<Chat[]> {
    const chats = await this.chatsRepository.find({
      where: [{ owner_id: userId }, { partner_id: userId }],
      take: getChatDto.take,
      skip: getChatDto.skip,
      order: { updatedAt: 'DESC' },
    });
    return chats;
  }

  public async getChatsWithFilters(
    userId: number,
    getChatDto: GetChatDto,
    filterDto: GetChatsFilterDto,
  ): Promise<Chat[]> {
    const { search } = filterDto;
    let chats = await this.getAllChats(userId, getChatDto);

    if (search) {
      chats = chats.filter(chat =>
        chat.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (!chats.length) {
      throw new HttpException(
        'Chats matching your search not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return chats;
  }

  public async findOne(id: number): Promise<Chat> {
    const chat = await this.chatsRepository.findOne({
      where: { id },
    });
    if (!chat) {
      throw new HttpException(
        'Chat with this ID not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return chat;
  }

  public async delete(id: number): Promise<Chat> {
    const chat = await this.chatsRepository.findOne({
      where: { id },
    });
    if (!chat) {
      throw new HttpException(
        'Chat with this ID not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.chatsRepository.delete(id);
    return chat;
  }
}
