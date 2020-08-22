import { IsOptional, IsNotEmpty, IsArray } from 'class-validator';

export class GetMessagesFilterDto {
  @IsOptional()
  //@IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  results: [];
}