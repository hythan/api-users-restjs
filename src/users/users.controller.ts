import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: any) {
    return this.usersService.create(data);
  }

  @Get()
  findAll(@Body() request: any) {
    return this.usersService.all(request);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: any) {
    return this.usersService.update({ where: id, data: user });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
