import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { GetTaskListDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel, UserModelBody, UserModelResponse } from './models/user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserModelResponse })
  async find(@Query() getTaskListDto: GetTaskListDto) {

    if (Object.keys(getTaskListDto) && Object.keys(getTaskListDto).length) {
      return await this.usersService.find(getTaskListDto);
    }

    else { return await this.usersService.findAll(); }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UserModelBody })
  @ApiOkResponse({ type: UserModelResponse })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return await this.usersService.create(createUserDto);
  }

  @Get(':ClientId')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserModelResponse })
  async findOne(@Param('ClientId') ClientId: string): Promise<UserModel> {
    return await this.usersService.findOne(ClientId);
  }

  @Put(':ClientId')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UserModelBody })
  @ApiOkResponse({ type: UserModelResponse })
  async update(@Param('ClientId') ClientId: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(ClientId, updateUserDto);
  }

  @Delete(':ClientId')
  @UseGuards(JwtAuthGuard)
  remove(@Param('ClientId') ClientId: string) {
    return this.usersService.remove(ClientId);
  }
}
