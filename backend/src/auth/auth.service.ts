import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hash, compare } from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // TODO: extract this into seperate config service
  saltRounds = 12;

  async signIn(signInDto: SignInDto) {
    const { email, pass } = signInDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('No user found for email: ' + email);
    }
    const passwordsEqual = await compare(pass, user.password);
    if (!passwordsEqual) {
      throw new BadRequestException('Invalid password');
    }
    const { password, ...userWithoutPassword } = user;
    const payload = { email: user.email, sub: user.id };
    const result = {
      token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
    return result;
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, pass } = signUpDto;
    const hashedPassword = await hash(pass, this.saltRounds);
    try {
      const user = await this.usersService.create(email, hashedPassword);
      const { password, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${email} already used.`);
      }
      throw new Error(e);
    }
  }
}
