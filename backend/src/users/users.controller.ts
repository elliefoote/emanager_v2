import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from './model/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    try {
      return new UserEntity(await this.usersService.findOneByEmail(email));
    } catch (err) {
      throw new NotFoundException('User could not be found!');
    }
  }
}
