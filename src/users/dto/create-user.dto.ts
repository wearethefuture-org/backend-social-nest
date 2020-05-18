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
}
