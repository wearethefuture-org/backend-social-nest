import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsEmail, IsNumber, IsDate } from 'class-validator';
import { UserRoleEnum, UserStatusEnum } from '../user.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  public firstName: string;

  @ApiProperty()
  @IsString()
  public lastName: string;

  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  public userName: string;

  @ApiProperty()
  @IsDate()
  public birthdayDate: Date;

  @ApiProperty()
  @IsString()
  public password: string;

  @ApiProperty({
    enum: UserStatusEnum
  })
  @IsString()
  public status?: string = UserStatusEnum.pending;

  @ApiProperty({
    enum: UserRoleEnum
  })
  @IsString()
  public role?: string = UserRoleEnum.user;

  @ApiProperty()
  @IsBoolean()
  public disabled?: boolean = false;
}

export class GetUserDto {
  @ApiProperty()
  @IsNumber()
  public limit?: number = 40;

  @ApiProperty()
  @IsInt()
  public offset?: number = 0;

  @ApiProperty()
  @IsString()
  public sortField?: string = 'id';

  @ApiProperty({
    enum: ['ASC', 'DSC']
  })
  @IsString()
  public direction?: string = 'ASC';

  @ApiProperty({
    enum: [true, false]
  })
  @IsBoolean()
  public onlyUsers?: boolean = true;
}
export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  public firstName: string;

  @ApiProperty()
  @IsString()
  public lastName: string;

  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  public userName: string;

  @ApiProperty()
  @IsDate()
  public birthdayDate: Date;

  @ApiProperty()
  @IsString()
  public password: string;


}
