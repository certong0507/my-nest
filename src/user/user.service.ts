import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  constructor(private sequelize: Sequelize) {}

  async getUser({}): Promise<any> {
    const user = await this.sequelize.query('SELECT * FROM user');
    return user;
  }

  async createUser(payload: {
    nric: string;
    email: string;
    firstName: string;
    password: string;
    lastName: string;
    username: string;
  }): Promise<any> {
    const user = await this.sequelize.query(
      `
      INSERT INTO user (nric, email, firstName, passwordHash, lastName, username) 
      VALUES ($nric, $email, $firstName, $password, $lastName, $username)`,
      { bind: payload },
    );

    return user;
  }
}
