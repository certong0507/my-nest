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
  async getUser(@Query() companyDetailQuery: { id: string }) {
    try {
      return await this.userService.getUser(companyDetailQuery);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
