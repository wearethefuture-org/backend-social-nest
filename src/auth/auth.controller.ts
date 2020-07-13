import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthLoginDto } from './dto/auth-login.dto';
import { CreateUserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
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
}
