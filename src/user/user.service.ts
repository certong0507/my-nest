import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  constructor(private sequelize: Sequelize) {}

  async getUser(payload: { id?: number; email?: string }): Promise<any> {
    let queryBinding = null;

    console.log(' ----- [getUser]', payload);
    if (!payload.id && !payload.id) {
      throw new BadRequestException('missing id or email');
    }

    if (payload.id) {
      queryBinding.id = payload.id;
    }

    if (payload.email) {
      queryBinding.email = payload.email;
    }

    const user = await this.sequelize.query('SELECT * FROM user ', {
      bind: queryBinding,
      type: QueryTypes.SELECT,
    });
    return user;
  }

  async createUser(payload: {
    nric: string;
    email: string;
    firstName: string;
    passwordHash: string;
    lastName: string;
    username: string;
  }): Promise<any> {
    const [result, metadata] = await this.sequelize.query(
      `
      INSERT INTO user (nric, email, firstName, passwordHash, lastName, username) 
      VALUES ($nric, $email, $firstName, $passwordHash, $lastName, $username)`,
      { bind: payload, type: QueryTypes.INSERT },
    );

    return result;
  }
}
