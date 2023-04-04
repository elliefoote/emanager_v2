import { ApiProperty } from '@nestjs/swagger';

export class CreateRepairDto {
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
