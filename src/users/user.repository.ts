import { EntityRepository, Repository, Between } from "typeorm";
import { User } from "./user.entity";
import { GetUsersFilterDto, GetCountersFilterDto } from "./dto/get-users-filter.dto";
import { processedData } from '../utils/dataProcessingCharts.utils'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('user');

    if (search) {
      query.where('last_name ILIKE :search', { search: `%${search}%` })
        .orWhere('first_name ILIKE :search', { search: `%${search}%` })
        .orWhere('user_name ILIKE :search', { search: `%${search}%` });
    }

    const users = await query.getMany();
    return users;
  }

  async getCountUsers(filterDto: GetCountersFilterDto): Promise<object> {
    const { startDate, endDate, step } = filterDto

    if (step === 'month') {
      const countUsers = await this.createQueryBuilder('user')
        .select("to_char(date_trunc('month', created_at), 'YYYY-MM') as date",)
        .addSelect("count(*) AS count")
        .where({
          createdAt: Between(startDate, `${endDate} 23:59:59`)
        })
        .groupBy("date")
        .orderBy("date")
        .getRawMany();

        console.log(countUsers)

      return processedData(filterDto, countUsers);
    }

    const countUsers = await this.createQueryBuilder('user')
      .select("to_char(date(created_at), 'YYYY-MM-DD') AS date",)
      .addSelect("count(*) AS count")
      .where({
        createdAt: Between(startDate, `${endDate} 23:59:59`)
      })
      .groupBy("DATE(created_at)")
      .orderBy("DATE(created_at)")
      .getRawMany();

    return processedData(filterDto, countUsers);
  }

  async getCountSelectUsers(filterDto: GetCountersFilterDto): Promise<number> {
    const { startDate, endDate } = filterDto

    const countSelectUsers = await this.count({
      where: { createdAt: Between(startDate, `${endDate} 23:59:59`) }
    })

    return countSelectUsers;
  }
}