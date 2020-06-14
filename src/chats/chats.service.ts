import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult, Not, IsNull } from 'typeorm';
import { Chats } from './chats.entity';
import { CreateChatsDto, GetChatsDto } from './dto/chats.dto';


@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chats)
    private readonly chatsRepository: Repository<Chats>,
  ) {
  }

  public async save(createChatsDto: CreateChatsDto): Promise<Chats> {
    return this.chatsRepository.save(createChatsDto);
  }

  public async find(getChatsDto: GetChatsDto): Promise<Chats[]> {
    const where = getChatsDto.isGlobal ? {} : { ownerId: Not(IsNull()) };
    return this.chatsRepository.find({
      skip: getChatsDto.offset,
      take: getChatsDto.limit,
      where: where,
    });
  }

  public async findOne(id: number): Promise<Chats> {
    return this.chatsRepository.findOne(id);
  }

  public async update(id: number, createChatsDto: CreateChatsDto): Promise<UpdateResult> {
    return this.chatsRepository.update({ id }, createChatsDto);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this.chatsRepository.delete(id);
  }
}

