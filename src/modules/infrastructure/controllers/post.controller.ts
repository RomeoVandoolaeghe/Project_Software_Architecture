import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from 'src/modules/application/dtos/create-post.dto';
import { UpdatePostDto } from 'src/modules/application/dtos/update-post.dto';
import { CreatePostUseCase } from 'src/modules/application/use-cases/create-post.use-case';
import { DeletePostUseCase } from 'src/modules/application/use-cases/delete-post.use-case';
import { GetPostByIdUseCase } from 'src/modules/application/use-cases/get-post-by-id.use-case';
import { GetPostsUseCase } from 'src/modules/application/use-cases/get-posts.use-case';
import { UpdatePostUseCase } from 'src/modules/application/use-cases/update-post.use-case';

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
  public getPosts() {
    const posts = this.getPostsUseCase.execute();

    return posts.map((p) => p.toJSON());
  }

  @Get(':id')
  public getPostById(@Param('id') id: string) {
    const post = this.getPostByIdUseCase.execute(id);

    return post?.toJSON();
  }

  @Post()
  public createPost(@Body() input: CreatePostDto) {
    return this.createPostUseCase.execute(input);
  }

  @Patch(':id')
  public updatePost(@Param('id') id: string, @Body() input: UpdatePostDto) {
    return this.updatePostUseCase.execute(id, input);
  }

  @Delete(':id')
  public deletePost(@Param('id') id: string) {
    return this.deletePostUseCase.execute(id);
  }
}
