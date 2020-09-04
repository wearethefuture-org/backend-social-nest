import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import {Controller, Post, Request, UseGuards, Body, Put} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthLoginDto } from './dto/auth-login.dto';
import { CreateUserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import {UsersService} from "../users/users.service";
import {hash} from "bcrypt";



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req, @Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(req.user, authLoginDto);
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post('restore')
  public async restorePassword(@Body() {email}) {
    const userData = await this.usersService.getUserByEmail(email);
    if (!!(userData)) {
      this.authService.sendEmail(email, userData.id);
      return (await this.usersService.getUserByEmail(email));
    }
  }

  @Post('confirm')
  public async confirmUser(@Body() {id, key}) {
    return this.authService.checkKey(id,key)
  }

  @Put('change-password')
  public async changeUser(@Body() {id, key, password}) {
    console.log(id, key, password);
    const isUser = !! await this.authService.checkKey(id,key);
    let userData = await this.usersService.findOne(id);
    userData.password =await hash(password, 10);
    console.log(userData);
    if (isUser) {
      await this.usersService.update( +id , userData);
    }
    this.authService.deleteKey(id);
    // return isUser? this.authService.changePassword(id, password) : throwError('Key is invalid')
  }
}
