import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  public async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  public async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
