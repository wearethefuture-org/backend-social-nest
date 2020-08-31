import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsEmail, IsNumber, IsDate } from 'class-validator';
import { isNumber } from 'util';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  public text: string;

  @ApiProperty()
  // @isNumber()
  public chat_id: number;
}

export class GetMessageDto {
  @ApiProperty()
  @IsNumber()
  public take?: number = 40;

  @ApiProperty()
  @IsInt()
  public skip?: number = 0;

  @ApiProperty()
  @IsString()
  public sortField?: string = 'id';

  @ApiProperty({
    enum: ['ASC', 'DSC']
  })
  @IsString()
  public order?: string = 'ASC';

  }
