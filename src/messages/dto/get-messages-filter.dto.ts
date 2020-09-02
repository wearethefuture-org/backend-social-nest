import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetMessagesFilterDto {
  
  @IsOptional()
  //@IsNotEmpty()
  search: string;
}