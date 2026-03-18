import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty({ example: 'typescript-advanced' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50, {
    message: 'Le nom du tag doit contenir entre 2 et 50 caractères',
  })
  @Matches(/^[a-zA-Z0-9-]+$/, { message: 'Format invalide' })
  name: string;
}
