import { EntityRepository, Repository } from "typeorm";
import { Message } from './messages.entity';
import { GetMessagesFilterDto } from './dto/get-messages-filter.dto';

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {
  async getMessagesOfChat(chatsOfUser, filterDto: GetMessagesFilterDto): Promise<Message[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('message');
    
    if (search) {
      query.where('text ILIKE :search', { search: `%${search}%`});
    }  

    const messages = await query.getMany();

    return messages;
  }
}