import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult} from 'typeorm';
import { Chats } from './chats.entity';
import { CreateChatsDto} from './dto/chats.dto';


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

  public async find(): Promise<Chats[]> {
    return this.chatsRepository.find();
  }

 /* public async find(getChatsDto: GetChatsDto): Promise<Chats[]> {
    const { limit = 30, offset = 0, isGlobal = true } = getChatsDto;
    const where = isGlobal ? {} : { ownerId: Not(Equal(null)) };
    return this.chatsRepository.find(
      {
        where,
        limit,
        offset,
      }
    );
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

