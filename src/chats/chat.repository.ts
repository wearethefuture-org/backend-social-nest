import { EntityRepository, Repository } from "typeorm";
import { Chat } from './chats.entity';
import { GetChatsFilterDto } from './dto/get-chats-filter.dto';

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

     
