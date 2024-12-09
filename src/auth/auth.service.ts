import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(payload: { email: string; password: string }): Promise<any> {
    const user = await this.userService.getUser(payload.email);
    if (user?.password !== payload.password) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  async register(payload: {
    nric: string;
    email: string;
    firstName: string;
    password: string;
    lastName: string;
    username: string;
  }): Promise<any> {
    const saltOrRounds = 10;
    const password = payload.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    console.log(' ----- [register]', hash);

    const newUser = await this.userService.createUser(payload);

    return {
      newUser,
      hash,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
