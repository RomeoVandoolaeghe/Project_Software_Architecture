import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../domain/entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  password: string;
}
