import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    example: 'typescript',
    description:
      'Le nom du tag en minuscules, alphanumérique avec tirets autorisés',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50, {
    message: 'Le nom du tag doit contenir entre 2 et 50 caractères',
  })
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message:
      'Le nom du tag doit être alphanumérique et peut contenir des tirets',
  })
  name: string;
}
