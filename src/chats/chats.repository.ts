import { EntityRepository, Repository, Between } from 'typeorm';
import { Chat } from './chats.entity';
import { processedData } from '../utils/dataProcessingCharts.utils';
import { AnalyticsFilterDto } from 'src/analytics/dto/analytics-filter.dto';
import { AnalyticsFilterStepEnum } from 'src/analytics/analytics.enum';

@EntityRepository(Chat)
export class ChatsRepository extends Repository<Chat> {
  async getCountChats(filterDto: AnalyticsFilterDto): Promise<object> {
    const { startDate, endDate, step } = filterDto;
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    if (step === AnalyticsFilterStepEnum.month) {
      const countChats = await this.createQueryBuilder('chat')
        .select("to_char(date_trunc('month', created_at), 'YYYY-MM') as date")
        .addSelect('count(*) AS count')
        .where({
          createdAt: Between(startDate, endDate),
        })
        .groupBy('date')
        .orderBy('date')
        .getRawMany();

      return processedData(filterDto, countChats);
    }

    const countChats = await this.createQueryBuilder('chat')
      .select("to_char(date(created_at), 'YYYY-MM-DD') AS date")
      .addSelect('count(*) AS count')
      .where({
        createdAt: Between(startDate, endDate),
      })
      .groupBy('DATE(created_at)')
      .orderBy('DATE(created_at)')
      .getRawMany();

    return processedData(filterDto, countChats);
  }

  async getCountChatsUser(id: number): Promise<number> {
    const countChats = await this.count({
      // eslint-disable-next-line @typescript-eslint/camelcase
      where: { owner_id: id },
    });

    return countChats;
  }

  async getCountSelectChats(filterDto: AnalyticsFilterDto): Promise<number> {
    const { startDate, endDate } = filterDto;
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    const countSelectChats = await this.count({
      where: { createdAt: Between(startDate, endDate) },
    });

    return countSelectChats;
  }
}
