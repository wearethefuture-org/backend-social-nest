import { UserRepository } from './user.repository';
import { ChatsRepository } from '../chats/chats.repository'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { File } from '../files/file.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { MessagesRepository } from 'src/messages/messages.repository';
import { AnalyticsFilterDto } from 'src/analytics/dto/analytics-filter.dto';
import { AnalyticsFilterNameEnum } from 'src/analytics/analytics.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(ChatsRepository)
    private chatsRepository: ChatsRepository,
    @InjectRepository(MessagesRepository)
    private readonly messagesRepository: MessagesRepository,
  ) {
  }
  public async createAvatar(userId: number, file: any): Promise<File> {
    const createAvatar = await this.fileRepository.save({
      name: file.filename,
      url: `${process.env.URL}/static/${file.filename}`,
      // url: `${process.env.URL}/${file.filename}`,
    });
    await this.usersRepository.save({ id: userId, avatar: createAvatar });
    return createAvatar;
  }


  public async save(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  public async update(id: number, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    });
    if (!user) {
      throw new HttpException('User with this ID not found', HttpStatus.NOT_FOUND);
    }
    this.usersRepository.update({ id }, createUserDto);
    return await this.usersRepository.findOne({
      where: { id }
    });
  }


  public async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.userRepository.getUsers(filterDto);
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new HttpException('User with this ID not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  public async delete(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new HttpException('User with this ID not found', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.delete(id);
    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  public async getDataAnalytic(filterDto: AnalyticsFilterDto): Promise<object> {
    const analytics: {
      countAllUsers?: number;
      countSelectUsers?: number;
      countUsers?: object;
      countSelectChats?: number;
      countChats?: object;
    } = {};

    analytics.countAllUsers = await this.usersRepository.count();

    if (filterDto.name === AnalyticsFilterNameEnum.users) {
      analytics.countSelectUsers = await this.userRepository.getCountSelectUsers(filterDto);
      analytics.countUsers = await this.userRepository.getCountUsers(filterDto);
    }

    if (filterDto.name === AnalyticsFilterNameEnum.chats) {
      analytics.countSelectChats = await this.chatsRepository.getCountSelectChats(filterDto);
      analytics.countChats = await this.chatsRepository.getCountChats(filterDto);
    }

    return analytics;
  }

  public async getCounters(id: number): Promise<object> {

    await this.findOne(id);

    const countChats = await this.chatsRepository.getCountChatsUser(id);
    const countMessages = await this.messagesRepository.getCountMessagesUser(id);

    return { countChats, countMessages };
  }
}
