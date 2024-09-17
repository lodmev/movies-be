import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UserData } from './users-data.decorator';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get('self')
  @ApiOkResponse({ type: UserEntity })
  async getSelf(@UserData('id') id: string) {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new UserEntity(await this.usersService.remove(id));
  }
}
