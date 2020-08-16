import { EntityRepository, Repository } from "typeorm";
import { Chat } from './chats.entity';
import { GetChatsFilterDto } from './dto/get-chats-filter.dto';
import { GetChatDto } from './dto/chat.dto';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
  async getChatsOfUser(filterDto: GetChatsFilterDto): Promise<Chat[]> {
    
    const { search } = filterDto;
    const query = this.createQueryBuilder('chat');
     
    if (search) {
      query.where('name ILIKE :search', { search: `%${search}%`});
    }  

    const chats = await query.getMany();

    return chats;
  }
}

//Try to use TypeORM QueryBuilder and make some inner joins to filter projects that does not belong to selected user