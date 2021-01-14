import { EntityRepository, Repository, Between } from "typeorm";
import { Chat } from "./chats.entity";
import { GetCountersFilterDto } from "./dto/get-chats-filter.dto";
import { processedData } from "../utils/dataProcessingCharts.utils"


@EntityRepository(Chat)
export class ChatsRepository extends Repository<Chat> {
    async getCountChats(filterDto: GetCountersFilterDto): Promise<object> {
        const { startDate, endDate, step } = filterDto

        if (step === 'month') {
            const countChats = await this.createQueryBuilder('chat')
                .select("to_char(date_trunc('month', created_at), 'YYYY-MM') as date",)
                .addSelect("count(*) AS count")
                .where({
                    createdAt: Between(startDate, `${endDate} 23:59:59`)
                })
                .groupBy("date")
                .orderBy("date")
                .getRawMany();

            return processedData(filterDto, countChats);
        }

        const countChats = await this.createQueryBuilder('chat')
            .select("to_char(date(created_at), 'YYYY-MM-DD') AS date")
            .addSelect("count(*) AS count")
            .where({
                createdAt: Between(startDate, `${endDate} 23:59:59`)
            })
            .groupBy("DATE(created_at)")
            .orderBy('DATE(created_at)')
            .getRawMany();

        return processedData(filterDto, countChats);;
    }

    async getCountChatsUser(id: number): Promise<number> {
        const countChats = await this.count({
            where: { owner_id: id }
        })

        return countChats;
    }

    async getCountSelectChats(filterDto: GetCountersFilterDto): Promise<number> {
        const { startDate, endDate } = filterDto

        const countSelectChats = await this.count({
            where: { createdAt: Between(startDate, `${endDate} 23:59:59`) }
        })

        return countSelectChats;
    }
}