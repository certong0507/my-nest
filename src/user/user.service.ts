import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  constructor(private sequelize: Sequelize) {}

  async getUser({}) {
    const user = await this.sequelize.query('SELECT * FROMuser');
    return user;
  }
}
