import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(email: string, hashedPassword: string) {
    return this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOneByEmail(email: string) {
    console.log(email);
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
