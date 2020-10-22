import { GetUsersFilterDto } from './dto/get-users-filter.dto';
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
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../utils/fileUpload.utils';
import { diskStorage } from 'multer';
import { File } from '../files/file.entity';
import * as path from "path";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Post()
  @ApiCreatedResponse({
    type: User
  })
  public create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.save(createUserDto);
  }

  @Post('images')
  @ApiCreatedResponse({
    type: File
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.env.PUBLIC_DIR || path.join(__dirname, '../../../public'),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public uploadedFile(@UploadedFile() file, @Request() req ): Promise<File> {
    return this.usersService.createAvatar(req.user.id, file);
  }


  @Get()
  @ApiCreatedResponse({
    type: [User] 
  })
  getUsers(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.update(id, createUserDto);
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: [User]
  })
  public findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  public delete(@Param('id') id: number): Promise<User> {
    return this.usersService.delete(id);
  }
}
