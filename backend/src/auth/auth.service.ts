import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOneByUsername(signInDto.username);
    if (!user) {
      throw new UnauthorizedException('The Username or Password is Incorrect.');
    }
    const isCompared = await bcrypt.compare(signInDto.password, user?.password);
    if (!isCompared) {
      throw new UnauthorizedException('The Username or Password is Incorrect.');
    }
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const candidate = await this.usersService.findOneByUsername(signUpDto.username);
    if (candidate) {
      throw new UnauthorizedException('The User already exists.');
    }
    const user = await this.usersService.createOne(signUpDto);
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  getProfile(id: string) {
    return this.usersService.findOneWithProfileById(id);
  }
}
