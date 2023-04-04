import { Repair } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RepairEntity implements Repair {
  @ApiProperty()
  id: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  serial_number: string;

  @ApiProperty()
  repair_status: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  client_id: string;

  @ApiProperty()
  assigned_to: string;
}
