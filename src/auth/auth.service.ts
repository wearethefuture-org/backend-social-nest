import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { User } from '../users/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  public async login(user: User, authLoginDto: AuthLoginDto) {
    const payload = { user, email: authLoginDto.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  public async payload(payload) {
    const user = await this.usersService.getUserByEmail(payload.email);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  public async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(createUserDto.email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    createUserDto.password = await hash(createUserDto.password, 10);

    return this.usersService.save(createUserDto);
  }

  public async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    if (forgotPasswordDto.idPwdReset) {
      await this.usersService.findOneByIdPwd(forgotPasswordDto.idPwdReset);
    }

    if (forgotPasswordDto.type === 'email') {
      const user = await this.usersService.getUserByEmail(
        forgotPasswordDto.email,
      );
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }

      const idPwd = uuidv4();

      user.idPwdReset = idPwd;
      this.usersService.save(user);

      const generatedLink = `http://${process.env.URL}/forgot-password/${idPwd}`;

      return generatedLink;
    }

    if (forgotPasswordDto.type === 'password') {
      const user = await this.usersService.findOneByIdPwd(
        forgotPasswordDto.idPwdReset,
      );

      if (!forgotPasswordDto.password) {
        throw new HttpException(
          'Password not be empty',
          HttpStatus.BAD_REQUEST,
        );
      }

      user.idPwdReset = '';
      user.password = await hash(forgotPasswordDto.password, 10);

      this.usersService.save(user);

      return 'Password change success';
    }
  }
}
