import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsEmail, IsNumber, IsDate } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  public text: string;
}

export class GetMessageDto {
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
}