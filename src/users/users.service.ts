import { UserRepository } from './user.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { File } from '../files/file.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {
  }
  public async createAvatar(userId: number, file: any): Promise<File> {
    const createAvatar = await this.fileRepository.save({
      name: file.filename,
      url: `${process.env.SERVE_HOST}:${process.env.PORT}${process.env.SERVE_ROOT}/${file.filename}`,
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
    this.usersRepository.update({id}, createUserDto);
    const updatedUser = await this.usersRepository.findOne({
      where: { id }
    });
    return updatedUser;
  }

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.userRepository.getUsers(filterDto);
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    });
    if (!user) {
      throw new HttpException('Chat with this ID not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  public async delete(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    });
    if (!user) {
      throw new HttpException('Chat with this ID not found', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.delete(id);
    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }
}
