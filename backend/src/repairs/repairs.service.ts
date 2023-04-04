import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';

@Injectable()
export class RepairsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRepairDto) {
    return this.prisma.repair.create({
      data,
    });
  }

  findAll(assignedTo?: string) {
    return this.prisma.repair.findMany({
      where: {
        assigned_to: assignedTo,
      },
      include: {
        client: true,
        // TODO - fix this as it is not secure - returns the whole user obj, including hashed password
        user: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.repair.findUnique({
      where: {
        id: id,
      },
      include: {
        client: true,
        // TODO - fix this as it is not secure - returns the whole user obj, including hashed password
        user: true,
      },
    });
  }

  update(id: string, data: UpdateRepairDto) {
    return this.prisma.repair.update({
      where: {
        id: id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.repair.delete({
      where: {
        id: id,
      },
    });
  }
}
