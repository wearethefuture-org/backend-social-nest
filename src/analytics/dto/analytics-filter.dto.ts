import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';
import {
  AnalyticsFilterNameEnum,
  AnalyticsFilterStepEnum,
} from '../analytics.enum';

export class AnalyticsFilterDto {
  @ApiProperty({ enum: AnalyticsFilterNameEnum })
  @IsString()
  public name: AnalyticsFilterNameEnum;

  @ApiProperty({ enum: AnalyticsFilterStepEnum })
  @IsString()
  public step: AnalyticsFilterStepEnum;

  @ApiProperty({ format: 'YYYY-MM-DD', description: 'example: 2020-12-01' })
  @IsDate()
  public startDate: Date;

  @ApiProperty({ format: 'YYYY-MM-DD', description: 'example: 2021-01-15' })
  @IsDate()
  public endDate: Date;
}
