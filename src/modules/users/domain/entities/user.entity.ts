import { v4 } from 'uuid';
import { UserUsername } from '../value-objects/user-username.value-object';

export type UserRole = 'user' | 'moderator' | 'admin';

export class UserEntity {
  private _username: UserUsername;
  private _role: UserRole;

  private constructor(
    readonly id: string,
    username: UserUsername,
    role: UserRole,
  ) {
    this._username = username;
    this._role = role;
  }

  public static create(username: string, role: UserRole): UserEntity {
    return new UserEntity(v4(), new UserUsername(username), role);
  }

  public toJSON() {
    return {
      id: this.id,
      role: this._role,
      username: this._username.toString(),
    };
  }

  public update(username?: string, role?: UserRole): void {
    if (username) {
      this._username = new UserUsername(username);
    }
    if (role) {
      this._role = role;
    }
  }

  public static reconstitute(input: Record<string, unknown>): UserEntity {
    return new UserEntity(
      input.id as string,
      new UserUsername(input.username as string),
      input.role as UserRole,
    );
  }
}
