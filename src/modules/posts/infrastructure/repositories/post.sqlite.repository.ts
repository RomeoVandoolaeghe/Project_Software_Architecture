import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { PostEntity } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';
import { SQLitePostEntity } from '../entities/post.sqlite.entity';

@Injectable()
export class SQLitePostRepository implements PostRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async getPosts(tags?: string[]): Promise<PostEntity[]> {
    let data: SQLitePostEntity[] = [];

    if (tags && tags.length > 0) {
      const matchingPosts = await this.dataSource
        .getRepository(SQLitePostEntity)
        .find({
          where: {
            tags: {
              name: In(tags),
            },
          },
          select: ['id'],
        });

      const ids = matchingPosts.map((p) => p.id);

      if (ids.length > 0) {
        data = await this.dataSource.getRepository(SQLitePostEntity).find({
          where: { id: In(ids) },
          relations: ['tags'],
        });
      }
    } else {
      data = await this.dataSource.getRepository(SQLitePostEntity).find({
        relations: ['tags'],
      });
    }

    return data.map((post) => PostEntity.reconstitute({ ...post }));
  }

  public async getPostById(id: string): Promise<PostEntity | undefined> {
    const post = await this.dataSource.getRepository(SQLitePostEntity).findOne({
      where: { id },
      relations: ['tags'],
    });

    return post ? PostEntity.reconstitute({ ...post }) : undefined;
  }

  public async createPost(input: PostEntity): Promise<void> {
    await this.dataSource.getRepository(SQLitePostEntity).save(input.toJSON());
  }

  public async updatePost(id: string, input: PostEntity): Promise<void> {
    await this.dataSource.getRepository(SQLitePostEntity).save(input.toJSON());
  }

  public async deletePost(id: string): Promise<void> {
    await this.dataSource.getRepository(SQLitePostEntity).delete(id);
  }
}
