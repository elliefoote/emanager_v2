import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RepairsService } from './repairs.service';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RepairEntity } from './model/repair.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('repairs')
@ApiTags('repairs')
@UseGuards(AuthGuard)
export class RepairsController {
  constructor(private readonly repairsService: RepairsService) {}

  @Post()
  @ApiCreatedResponse({ type: RepairEntity })
  async create(@Body() createRepairDto: CreateRepairDto) {
    try {
      return new RepairEntity(
        await this.repairsService.create(createRepairDto),
      );
    } catch (err) {
      // TODO - should provide the client with a more useful error/accurate msg
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  @Get()
  @ApiOkResponse({ type: RepairEntity, isArray: true })
  async findAll() {
    const repairs = await this.repairsService.findAll();
    return repairs.map((a) => new RepairEntity(a));
  }

  @Get('/user/:assigned_to')
  @ApiOkResponse({ type: RepairEntity, isArray: true })
  async findAllFilterByUser(@Param('assigned_to') assignedTo: string) {
    const repairs = await this.repairsService.findAll(assignedTo);
    return repairs.map((a) => new RepairEntity(a));
  }

  @Get(':id')
  @ApiOkResponse({ type: RepairEntity })
  async findOne(@Param('id') id: string) {
    try {
      return new RepairEntity(await this.repairsService.findOne(id));
    } catch (err) {
      throw new NotFoundException(`Repair with id ${id} could not be found.`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRepairDto: UpdateRepairDto,
  ) {
    try {
      return new RepairEntity(
        await this.repairsService.update(id, updateRepairDto),
      );
    } catch (err) {
      throw new InternalServerErrorException('Repair could not be updated');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return new RepairEntity(await this.repairsService.remove(id));
    } catch (err) {
      throw new InternalServerErrorException('Repair could not be deleted');
    }
  }
}
