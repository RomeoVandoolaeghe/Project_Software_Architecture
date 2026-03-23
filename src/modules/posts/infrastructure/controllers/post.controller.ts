import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { Requester } from '../../../shared/auth/infrastructure/decorators/requester.decorator';
import { JwtAuthGuard } from '../../../shared/auth/infrastructure/guards/jwt-auth.guard';
import { UserEntity } from '../../../users/domain/entities/user.entity';
import { CreatePostDto } from '../../application/dtos/create-post.dto';
import { UpdatePostDto } from '../../application/dtos/update-post.dto';
import { CreatePostUseCase } from '../../application/use-cases/create-post.use-case';
import { DeletePostUseCase } from '../../application/use-cases/delete-post.use-case';
import { GetPostByIdUseCase } from '../../application/use-cases/get-post-by-id.use-case';
import { GetPostsUseCase } from '../../application/use-cases/get-posts.use-case';
import { UpdatePostUseCase } from '../../application/use-cases/update-post.use-case';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AddTagToPostUseCase } from '../../application/use-cases/add-tag-to-post.use-case';
import { RemoveTagFromPostUseCase } from '../../application/use-cases/remove-tag-from-post.use-case';
import { ApiQuery } from '@nestjs/swagger';
import { GetPostBySlugUseCase } from '../../application/use-cases/get-post-by-slug.use-case';

@Controller('posts')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly getPostsUseCase: GetPostsUseCase,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly addTagToPostUseCase: AddTagToPostUseCase,
    private readonly removeTagFromPostUseCase: RemoveTagFromPostUseCase,
    private readonly getPostBySlugUseCase: GetPostBySlugUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lister les posts' })
  @ApiQuery({
    name: 'tags',
    required: false,
    description: 'Filtrer par tags séparés par des virgules',
  })
  async getPosts(@Query('tags') tags?: string) {
    const posts = await this.getPostsUseCase.execute(tags);

    return posts.map((post) => post.toJSON());
  }

  @Get('slug/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return this.getPostBySlugUseCase.execute(slug);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getPostById(
    @Requester() user: UserEntity,
    @Param('id') id: string,
  ) {
    const post = await this.getPostByIdUseCase.execute(id, user);

    return post?.toJSON();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createPost(
    @Requester() user: UserEntity,
    @Body() input: Omit<CreatePostDto, 'authorId'>,
  ) {
    return this.createPostUseCase.execute(
      { ...input, authorId: user.id },
      user,
    );
  }

  @Patch(':id')
  public async updatePost(
    @Param('id') id: string,
    @Body() input: UpdatePostDto,
  ) {
    return this.updatePostUseCase.execute(id, input);
  }

  @Delete(':id')
  public async deletePost(@Param('id') id: string) {
    return this.deletePostUseCase.execute(id);
  }

  @Post(':postId/tags/:tagId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ajouter un tag à un post' })
  @ApiResponse({ status: 200, description: 'Tag ajouté avec succès.' })
  @ApiResponse({ status: 403, description: 'Non autorisé à modifier ce post.' })
  @ApiResponse({ status: 404, description: 'Post ou Tag introuvable.' })
  @ApiResponse({
    status: 409,
    description: 'Le tag est déjà associé à ce post.',
  })
  async addTagToPost(
    @Param('postId') postId: string,
    @Param('tagId') tagId: string,
    @Req() req: Request & { user: { id: string; role: string } },
  ) {
    const userId = req.user.id;
    const isAdmin = req.user.role === 'ADMIN';

    const post = await this.addTagToPostUseCase.execute(
      postId,
      tagId,
      userId,
      isAdmin,
    );
    return post.toJSON();
  }

  @Delete(':postId/tags/:tagId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Retirer un tag d'un post" })
  @ApiResponse({ status: 204, description: 'Tag retiré avec succès.' })
  @ApiResponse({
    status: 404,
    description: 'Post, Tag ou association introuvable.',
  })
  async removeTagFromPost(
    @Param('postId') postId: string,
    @Param('tagId') tagId: string,
    @Req() req: Request & { user: { id: string; role: string } },
  ) {
    const userId = req.user.id;
    const isAdmin = req.user.role === 'ADMIN';

    await this.removeTagFromPostUseCase.execute(postId, tagId, userId, isAdmin);
  }
}
