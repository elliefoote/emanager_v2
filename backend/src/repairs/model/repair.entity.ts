import { Repair } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/model/user.entity';
import { ClientEntity } from '../../clients/model/client.entity';

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

  @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity;

  @ApiProperty({ required: false, type: ClientEntity })
  client?: ClientEntity;

  // remove the user's password from the return obj
  constructor({ user, ...data }: Partial<RepairEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
