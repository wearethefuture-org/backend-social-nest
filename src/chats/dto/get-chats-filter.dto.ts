import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetChatsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

}