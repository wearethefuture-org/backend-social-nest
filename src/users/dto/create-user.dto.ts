import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  public firstName: string;

  @ApiProperty({
    required: true,
  })
  public lastName: string;

  @ApiProperty({
    required: true,
  })
  public email: string;

  @ApiProperty({
    required: true,
  })
  public userName: string;

  @ApiProperty({
    required: true,
  })
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

  @ApiProperty()
  public birthdayDate: Date;
}
