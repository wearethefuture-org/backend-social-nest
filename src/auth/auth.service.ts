import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  public async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(String(password), user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  public async login(authLoginDto: AuthLoginDto) {
    const payload = {email: authLoginDto.email};

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async payload(payload) {
    const user = await this.usersService.getUserByEmail(payload.email)

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  public async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(createUserDto.email)

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    createUserDto.password = await hash(createUserDto.password, 10);

    return this.usersService.save(createUserDto);
  }
}
