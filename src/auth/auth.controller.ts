import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Request, UseGuards, Body,Logger } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthLoginDto } from './dto/auth-login.dto';
import { CreateUserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
  ) {
  }
  private logger = new Logger('SMTP_LOGGER');
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req, @Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(req.user, authLoginDto);
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post('regmail')
public example(@Body() req): void {
  this
    .mailerService
    .sendMail({
      to: req.email, // list of receivers
      //from: 'nest@domain.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      //text: 'welcome', // plaintext body
      html: `Hi ${req.firstName}, welcome to our social network`, // HTML body content
    })
    .then(() => {})
    .catch((response) => {
      this.logger.log(response);
    });

}

}
