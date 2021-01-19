import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, EditUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { File } from '../files/file.entity';
import { editFileName, imageFileFilter } from '../utils/fileUpload.utils';
import { CreateUserDto } from './dto/user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { AnalyticsFilterDto } from '../analytics/dto/analytics-filter.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: User,
  })
  public create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.save(createUserDto);
  }

  @Post('images')
  @ApiCreatedResponse({
    type: File,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination:
          process.env.PUBLIC_DIR || path.join(__dirname, '../../../public'),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public uploadedFile(@UploadedFile() file, @Request() req): Promise<File> {
    return this.usersService.createAvatar(req.user.id, file);
  }

  @Get()
  @ApiCreatedResponse({
    type: [User],
  })
  getUsers(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  @Get('analytics')
  public getDataAnalytic(@Query() req: AnalyticsFilterDto): Promise<object> {
    return this.usersService.getDataAnalytic(req);
  }

  @Get('analytics/:id')
  public getCounters(@Param('id') id: number): Promise<object> {
    return this.usersService.getCounters(id);
  }

  @Put(':id')
  public update(@Request() req, @Param('id') id: number, @Body() editUserDto: EditUserDto): Promise<User> {
    return this.usersService.update(req.user, id, editUserDto);
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: [User],
  })
  public findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  public delete(@Param('id') id: number): Promise<User> {
    return this.usersService.delete(id);
  }
}
