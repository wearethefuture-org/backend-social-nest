import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty()
  @IsString()
  public type?: string = '';

  @ApiProperty()
  @IsString()
  public email?: string = '';

  @ApiProperty()
  @IsString()
  public password?: string = '';

  @ApiProperty()
  @IsString()
  public idPwdReset?: string = '';
}
