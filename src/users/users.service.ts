import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
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

  update(params: { where: string; data: Prisma.UserUpdateInput }) {
    return this.prisma.user.update({
      where: { id: Number(params.where) },
      data: params.data,
    });
  }

  remove(where: number) {
    return this.prisma.user.delete({
      where: { id: Number(where) },
    });
  }
}
