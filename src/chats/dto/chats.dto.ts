import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsInt } from 'class-validator';

export class CreateChatsDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsString()
  public description: string;

  @ApiProperty()
  @IsBoolean()
  public available?: boolean = true;
}
export class GetChatsDto {
  @ApiProperty()
  @IsNumber()
  public limit?: number = 10;

  @ApiProperty()
  @IsInt()
  public offset?: number = 0;

  @ApiProperty()
  @IsBoolean()
  public isGlobal?: boolean = false;
}
