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
import { PostService } from '../../application/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  public getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Post()
  public createPost(@Body() input: CreatePostDto) {
    return this.postService.createPost(input);
  }

  @Patch(':id')
  public updatePost(@Param('id') id: string, @Body() input: UpdatePostDto) {
    return this.postService.updatePost(id, input);
  }

  @Delete(':id')
  public deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
