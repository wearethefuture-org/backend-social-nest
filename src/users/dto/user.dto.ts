import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  public firstName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  public lastName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  public email: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  public userName: string;

  @ApiProperty({
    required: true,
  })
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
  public disabled: boolean;

  @ApiProperty({
    required: true,
  })
  @IsString()
  public birthdayDate: Date;
}

export class GetUserDto {
  @ApiProperty({
    type: Number,
    required: true,
    default: 30,
  })
  public limit: number;

  @ApiProperty({
    type: Number,
    required: true,
    default: 0
  })
  public offset: number;

  @ApiProperty({
    required: false,
    default: 'id'
  })
  public sortField: string;

  @ApiProperty({
    required: false,
    default: 'ASC'
  })
  public direction: string;
}