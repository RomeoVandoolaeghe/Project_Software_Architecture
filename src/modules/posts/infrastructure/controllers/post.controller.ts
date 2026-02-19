import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from '../../application/dtos/create-post.dto';
import { UpdatePostDto } from '../../application/dtos/update-post.dto';
import { CreatePostUseCase } from '../../application/use-cases/create-post.use-case';
import { DeletePostUseCase } from '../../application/use-cases/delete-post.use-case';
import { GetPostByIdUseCase } from '../../application/use-cases/get-post-by-id.use-case';
import { GetPostsUseCase } from '../../application/use-cases/get-posts.use-case';
import { UpdatePostUseCase } from '../../application/use-cases/update-post.use-case';

@Controller('posts')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly getPostsUseCase: GetPostsUseCase,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
  ) {}

  @Get()
  public async getPosts() {
    const posts = await this.getPostsUseCase.execute();

    return posts.map((p) => p.toJSON());
  }

  @Get(':id')
  public async getPostById(@Param('id') id: string) {
    const post = await this.getPostByIdUseCase.execute(id);

    return post?.toJSON();
  }

  @Post()
  public async createPost(@Body() input: CreatePostDto) {
    return this.createPostUseCase.execute(input);
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
}
