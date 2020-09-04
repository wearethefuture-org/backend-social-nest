import { UserRepository } from './user.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { File } from '../files/file.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
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
    this.usersRepository.update({id}, createUserDto);
    return await this.usersRepository.findOne({
      where: { id }
    });
  }


  public async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
  //   const users = await this.usersRepository.find();
  //   if (!users) {
  //     throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
  //   }
  //   return users;
  // }
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
}
