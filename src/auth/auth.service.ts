import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from '../users/user.entity';
import * as nodemailer from 'nodemailer';
import { pugEngine } from "nodemailer-pug-engine";
import * as path from 'path';
import {InjectRepository} from "@nestjs/typeorm";
import {ResetPasswordKeyEntity} from "./reset-password-key.entity";
import {Repository} from "typeorm";
import {throwError} from "rxjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(ResetPasswordKeyEntity)
    private resetPasswordKeyEntity: Repository<ResetPasswordKeyEntity>
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

  public async login(user: User, authLoginDto: AuthLoginDto) {
    const payload = {user, email: authLoginDto.email};

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

  public async sendEmail (recipient: string, id: number) {
    const nodemailerClient = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      secure: !!process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS
      }
    });

    const userByKey = Math.random()
        .toString(36)
        .substring(2, 15) + Math.random()
        .toString(36)
        .substring(2, 15);

     this.deleteKey(id);
     this.resetPasswordKeyEntity.save({userId:id, key:userByKey });

    nodemailerClient.use('compile', pugEngine({
      templateDir:path.join( __dirname , '../../../src/views'),
      pretty: true
    }));

    const message = {
      from: `Open Social Network<noreply.${process.env.SMTP_AUTH_USER}>`,
      to: recipient,
      subject: '[Open social network] Please restore your password',
      template: 'restore',
      ctx: {
         url: `${process.env.FRONT_URL}:${process.env.FRONT_PORT}/auth/confirm?key=${userByKey}&id=${id}`
      }
    };

      nodemailerClient.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info.response);
        }
      });
  }

  deleteKey(id) {
    if(!!this.resetPasswordKeyEntity.findOne({userId:id})){
      this.resetPasswordKeyEntity.delete({userId:id});
    }
  }

  public async checkKey(id,key) {
    const resetObj = await this.resetPasswordKeyEntity.findOne({userId: id, key});
     return !! resetObj? true : throwError('Key is invalid');
  }
}


