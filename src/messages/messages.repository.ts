import { EntityRepository, Repository } from "typeorm";
import { Message } from "./messages.entity";

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {
    async getCountMessagesUser(id: number): Promise<number> {
        const countMessages = await this.count({
            where: { owner_id: id }
          })

        return countMessages;
    }
}