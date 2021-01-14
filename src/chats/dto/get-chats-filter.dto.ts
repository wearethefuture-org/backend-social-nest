import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetChatsFilterDto {
  @IsOptional()
  search: string;
}

export class GetCountersFilterDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  step: string;

  @IsOptional()
  @IsNotEmpty()
  startDate: string;

  @IsOptional()
  @IsNotEmpty()
  endDate: string;
}