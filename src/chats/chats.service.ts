import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult, Not, Equal, getRepository } from 'typeorm';
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


/*  public async find(getChatsDto: GetChatsDto): Promise<Chats[]> {
    const chats = await getRepository(Chats)
      .createQueryBuilder("chats")
      .limit(30)
      .offset(0)
      .getMany();
    const { limit = 30, offset = 0, isGlobal = true } = getChatsDto;
    const where = isGlobal ? {} : { ownerId: Not(Equal(null)) };
    return this.chatsRepository.find();
  }*/

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

