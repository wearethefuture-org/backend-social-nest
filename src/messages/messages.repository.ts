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












// Here's my pattern for query-string/searching in an API:
  // transform the query string to a search object/dto ( requires ValidationPipe w/ transform: true)
  // Use TypeOrm querybuilder (not avail. for mongo, but still doable using $or queries) and build simple logic to check for optional properties to shape the query.
  // There are simpler ways to write the service. Iterating over the DTO could clean things up if all query params are optional.
// Controller
// @Get( '/search' )
// searchableApi( @Query() searchDto: MySearchDto ): Promise<...> {
//  return this.injectedService.search( searchDto );
// }

// Service
// search( searchDto: MySearchDto ): Promise<...> {
//   const qb = this.injectedPostgresRepo.createQueryBuilder();

//   if( searchDto.optionalFieldA ) {
//     qb.orWhere( 'optionalFieldA': searchDto.optionalFieldA ); //
//   }

//   return qb.getMany();
// }


     