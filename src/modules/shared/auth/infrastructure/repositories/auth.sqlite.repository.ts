import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { SQLiteUserEntity } from 'src/modules/users/infrastructure/entities/user.sqlite.entity';
import { DataSource } from 'typeorm';
import { AuthRepository } from '../../domain/repositories/auth.repository';

@Injectable()
export class SQLiteAuthRepository implements AuthRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async findUserByUsername(
    username: string,
  ): Promise<UserEntity | undefined> {
    const user = await this.dataSource
      .getRepository(SQLiteUserEntity)
      .findOne({ where: { username } });

    return user ? UserEntity.reconstitute({ ...user }) : undefined;
  }

  public async findUserById(id: string): Promise<UserEntity | undefined> {
    const user = await this.dataSource
      .getRepository(SQLiteUserEntity)
      .findOne({ where: { id } });

    return user ? UserEntity.reconstitute({ ...user }) : undefined;
  }
}
