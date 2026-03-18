import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreateTagUseCase } from '../../application/use-cases/create-tag.use-case';
import { ListTagsUseCase } from '../../application/use-cases/list-tags.use-case';
import { UpdateTagUseCase } from '../../application/use-cases/update-tag.use-case';
import { DeleteTagUseCase } from '../../application/use-cases/delete-tag.use-case';

import { CreateTagDto } from '../../application/dtos/create-tag.dto';
import { UpdateTagDto } from '../../application/dtos/update-tag.dto';

import { JwtAuthGuard } from '../../../shared/auth/infrastructure/guards/jwt-auth.guard';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(
    private readonly createTagUseCase: CreateTagUseCase,
    private readonly listTagsUseCase: ListTagsUseCase,
    private readonly updateTagUseCase: UpdateTagUseCase,
    private readonly deleteTagUseCase: DeleteTagUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouveau tag (Admin uniquement)' })
  @ApiResponse({ status: 201, description: 'Le tag a été créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Format du nom invalide.' })
  @ApiResponse({ status: 401, description: 'Non authentifié.' })
  @ApiResponse({ status: 403, description: 'Interdit : non administrateur.' })
  @ApiResponse({ status: 409, description: 'Le nom du tag existe déjà.' })
  async createTag(@Body() dto: CreateTagDto) {
    const tag = await this.createTagUseCase.execute(dto);
    return {
      id: tag.getId(),
      name: tag.getName().getValue(),
      createdAt: tag.getCreatedAt(),
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lister tous les tags (Public)' })
  @ApiResponse({
    status: 200,
    description: 'Liste des tags récupérée avec succès.',
  })
  async listTags() {
    const tags = await this.listTagsUseCase.execute();
    return {
      tags: tags.map((tag) => ({
        id: tag.getId(),
        name: tag.getName().getValue(),
        createdAt: tag.getCreatedAt(),
      })),
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un tag (Admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Tag mis à jour.' })
  @ApiResponse({ status: 400, description: 'Format du nom invalide.' })
  @ApiResponse({ status: 401, description: 'Non authentifié.' })
  @ApiResponse({ status: 404, description: 'Tag introuvable.' })
  @ApiResponse({ status: 409, description: 'Le nouveau nom existe déjà.' })
  async updateTag(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    const tag = await this.updateTagUseCase.execute(id, dto);
    return {
      id: tag.getId(),
      name: tag.getName().getValue(),
      createdAt: tag.getCreatedAt(),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un tag (Admin uniquement)' })
  @ApiResponse({ status: 204, description: 'Tag supprimé avec succès.' })
  @ApiResponse({ status: 401, description: 'Non authentifié.' })
  @ApiResponse({ status: 404, description: 'Tag introuvable.' })
  async deleteTag(@Param('id') id: string) {
    await this.deleteTagUseCase.execute(id);
  }
}
