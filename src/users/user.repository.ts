import { EntityRepository, Repository, Between } from 'typeorm';
import { User } from './user.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { AnalyticsFilterDto } from 'src/analytics/dto/analytics-filter.dto';
import { processedData } from '../utils/dataProcessingCharts.utils';
import { AnalyticsFilterStepEnum } from 'src/analytics/analytics.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('user');

    if (search) {
      query
        .where('last_name ILIKE :search', { search: `%${search}%` })
        .orWhere('first_name ILIKE :search', { search: `%${search}%` })
        .orWhere('user_name ILIKE :search', { search: `%${search}%` });
    }

    const users = await query.getMany();
    return users;
  }

  async getCountUsers(filterDto: AnalyticsFilterDto): Promise<object> {
    const { startDate, endDate, step } = filterDto;
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);
    

    if (step === AnalyticsFilterStepEnum.month) {
      const countUsers = await this.createQueryBuilder('user')
        .select("to_char(date_trunc('month', created_at), 'YYYY-MM') as date")
        .addSelect('count(*) AS count')
        .where({
          createdAt: Between(startDate, endDate),
        })
        .groupBy('date')
        .orderBy('date')
        .getRawMany();

      return processedData(filterDto, countUsers);
    }

    const countUsers = await this.createQueryBuilder('user')
      .select("to_char(date(created_at), 'YYYY-MM-DD') AS date")
      .addSelect('count(*) AS count')
      .where({
        createdAt: Between(startDate, endDate),
      })
      .groupBy('DATE(created_at)')
      .orderBy('DATE(created_at)')
      .getRawMany();

    return processedData(filterDto, countUsers);
  }

  async getCountSelectUsers(filterDto: AnalyticsFilterDto): Promise<number> {
    const { startDate, endDate } = filterDto;
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    const countSelectUsers = await this.count({
      where: { createdAt: Between(startDate, endDate) },
    });

    return countSelectUsers;
  }
}
