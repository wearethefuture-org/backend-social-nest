import { IsOptional } from 'class-validator';

export class GetChatsFilterDto {
  @IsOptional()
  search: string;
}
