import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query, Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/fileUpload.utils';
import { CreateFileDto } from '../files/dto/files.dto';
import { FilesService } from '../files/files.service';
import { File } from '../files/file.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,

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
        destination: 'static/uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public uploadedFile(@UploadedFile() file, @Request() req ): Promise<File> {
    return this.filesService.create(req.user.id, file);
  }


  /*async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }*/



  @Get()
  // @ApiCreatedResponse({
  //   type: [User]
  // })
  getUsers(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  /*@Post(':id')
  public update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }*/


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
