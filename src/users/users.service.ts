import { UserRepository } from './user.repository';
import { ChatsRepository } from '../chats/chats.repository'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { File } from '../files/file.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { MessagesRepository } from 'src/messages/messages.repository';
import { AnalyticsFilterDto } from 'src/analytics/dto/analytics-filter.dto';
import { AnalyticsFilterNameEnum } from 'src/analytics/analytics.enum';
import { UserRoleEnum } from './user.enum'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  public async createAvatar(userId: number, file: any): Promise<File> {
    const createAvatar = await this.fileRepository.save({
      name: file.filename,
      url: `${process.env.URL}/static/${file.filename}`,
    });
    await this.usersRepository.save({ id: userId, avatar: createAvatar });
    return createAvatar;
  }

  public async save(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  public async update(authUser: User, id: number, editUserDto: EditUserDto): Promise<User> {
    const isAuthUserId = authUser.id === id;
    const isSuperAdmin = authUser.role === UserRoleEnum.superadmin;

    const user = await this.usersRepository.findOne({
      where: { id },
    });
    
    if (!user) {
      throw new HttpException(
        'User with this ID not found',
        HttpStatus.NOT_FOUND,
      );
    }
    
    if (isAuthUserId || isSuperAdmin) {
      this.usersRepository.update({ id }, editUserDto);
    } else {
      throw new HttpException('The user does not have access to change user data with this ID', HttpStatus.FORBIDDEN);
    }

    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  public async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.userRepository.getUsers(filterDto);
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        'User with this ID not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  public async delete(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        'User with this ID not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.usersRepository.delete(id);
    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  public async getDataAnalytic(filterDto: AnalyticsFilterDto): Promise<object> {
    const analytics: {
      totalCount?: number;
      countSelect?: number;
      countUsers?: object;
      countChats?: object;
    } = {};

    if (filterDto.name === AnalyticsFilterNameEnum.users) {
      analytics.totalCount = await this.usersRepository.count();
      analytics.countSelect = await this.userRepository.getCountSelectUsers(filterDto);
      analytics.countUsers = await this.userRepository.getCountUsers(filterDto);

      return analytics;
    }

    analytics.totalCount = await this.chatsRepository.count();
    analytics.countSelect = await this.chatsRepository.getCountSelectChats(filterDto);
    analytics.countChats = await this.chatsRepository.getCountChats(filterDto);

    return analytics;
  }

  public async getCounters(id: number): Promise<object> {

    await this.findOne(id);

    const countChats = await this.chatsRepository.getCountChatsUser(id);
    const countMessages = await this.messagesRepository.getCountMessagesUser(id);

    return { countChats, countMessages };
  }
}
