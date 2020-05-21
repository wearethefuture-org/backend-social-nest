import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  public firstName: string;

  @ApiProperty()
  @IsString()
  public lastName: string;

  @ApiProperty()
  @IsString()
  public email: string;

  @ApiProperty()
  @IsString()
  public userName: string;

  @ApiProperty()
  @IsString()
  public password: string;

  @ApiProperty({
    enum: ['pending', 'confirmed', 'invited']
  })
  public status: string;

  @ApiProperty({
    enum: ['user', 'admin', 'superadmin']
  })
  public role: string;

  @ApiProperty()
  @IsString()
  public birthdayDate: Date;

  @ApiProperty({
    required: false
  })
  public disabled: boolean;
}

export class GetUserDto {
  @ApiProperty({
    default: 30
  })
  @IsInt()
  public limit: number;

  @ApiProperty({
    default: 0
  })
  @IsInt()
  public offset: number;

  @ApiProperty({
    default: 'id'
  })
  public sortField: string;

  @ApiProperty({
    default: 'ASC'
  })
  public direction: string;

  @ApiProperty({
    default: true
  })
  @IsBoolean()
  public onlyUsers: boolean;
}
