import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: { email: string; password: string }) {
    try {
      return await this.authService.login(payload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('register')
  async register(
    @Body()
    payload: {
      nric: string;
      email: string;
      firstName: string;
      password: string;
      lastName: string;
      username: string;
    },
  ) {
    try {
      return await this.authService.register(payload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
