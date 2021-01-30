import { IsOptional, IsNumber } from 'class-validator';

export class GetChatsFilterDto {
  @IsNumber()
  public id: number;

  @IsOptional()
  search: string;
}
