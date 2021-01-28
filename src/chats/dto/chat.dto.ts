import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber } from 'class-validator';

export class CreateChatDto {
  @ApiProperty()
  @IsString()
  public name: string = 'My Chat';

  @ApiProperty()
  @IsString()
  public description: string = '';

  @ApiProperty()
  @IsNumber()
  public partner_id: number;

  @ApiProperty()
  @IsNumber()
  public owner_id: number;
}

export class GetChatDto {
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
    enum: ['ASC', 'DSC'],
  })
  @IsString()
  public order?: string = 'DSC';
}
