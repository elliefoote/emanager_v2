import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateClientDto) {
    return this.prisma.client.create({
      data,
    });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  findOne(id: string) {
    return this.prisma.client.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, data: UpdateClientDto) {
    return this.prisma.client.update({
      where: {
        id: id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.client.delete({
      where: {
        id: id,
      },
    });
  }
}
