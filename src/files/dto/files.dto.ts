import { ApiProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';

export class CreateFileDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsString()
  public url: string;

}
