import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/helpers/bcrypt.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, BcryptService],
  exports: [UsersService],
})
export class UsersModule {}
