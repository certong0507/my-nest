import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Query() payload: { id?: number; email?: string }) {
    try {
      return await this.userService.getUser(payload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
