import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsEmail, IsNumber } from 'class-validator';

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
  @IsString()
  public birthdayDate: Date;

  @ApiProperty()
  @IsString()
  public password: string;

  @ApiProperty({
    enum: ['pending', 'confirmed', 'invited'],
  })
  @IsString()
  public status?: string = 'pending';

  @ApiProperty({
    enum: ['user', 'admin', 'superadmin'],
  })
  @IsString()
  public role?: string = 'user';

  @ApiProperty()
  @IsBoolean()
  public disabled?: boolean = false;
}

export class GetUserDto {
  @ApiProperty()
  @IsNumber()
  public limit: number;

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
