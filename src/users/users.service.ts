import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/helpers/bcrypt.service';
import { ErrorsService } from 'src/helpers/errors.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcrypt: BcryptService,
    private errorsService: ErrorsService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User | any> {
    try {
      if (!data.email || !data.password || !data.name) {
        return this.errorsService.getErrorMessage({
          error: 'Check the data sent. Some value are empty.',
        });
      }

      data.password = this.bcrypt.encodePassword(data.password);
      const response = await this.prisma.user.create({ data });
      return response;
    } catch (e) {
      return this.errorsService.getErrorMessage(e);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  all(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    if (params.skip) {
      params.skip = Number(params.skip);
    }
    return this.prisma.user.findMany(params);
  }

  find(id: number): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      return error;
    }
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(params: { where: string; data: Prisma.UserUpdateInput }) {
    if (params.data.password) {
      params.data.password = this.bcrypt.encodePassword(params.data.password);
    }

    try {
      const response = await this.prisma.user.update({
        where: { id: Number(params.where) },
        data: params.data,
      });
      return response;
    } catch (error) {
      return this.errorsService.getErrorMessage(error);
    }
  }

  remove(where: number) {
    return this.prisma.user.delete({
      where: { id: Number(where) },
    });
  }
}
