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
  BadRequestException,
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
  create(@Body() createRepairDto: CreateRepairDto) {
    console.log(createRepairDto);
    return this.repairsService.create(createRepairDto);
  }

  @Get()
  @ApiOkResponse({ type: RepairEntity, isArray: true })
  findAll() {
    return this.repairsService.findAll();
  }

  @Get('/user/:assigned_to')
  @ApiOkResponse({ type: RepairEntity, isArray: true })
  findAllFilterByUser(@Param('assigned_to') assignedTo: string) {
    return this.repairsService.findAll(assignedTo);
  }

  @Get(':id')
  @ApiOkResponse({ type: RepairEntity })
  findOne(@Param('id') id: string) {
    const repair = this.repairsService.findOne(id);
    if (!repair) {
      throw new NotFoundException(`Repair with ${id} does not exist.`);
    }
    return repair;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepairDto: UpdateRepairDto) {
    return this.repairsService.update(id, updateRepairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const deleted = this.repairsService.remove(id);
    if (!deleted) {
      throw new BadRequestException(`Deletion failed`);
    }
  }
}
