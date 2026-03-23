import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { PostEntity, PostStatus } from '../../domain/entities/post.entity';
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

  public async getPostBySlug(slug: string): Promise<PostEntity | undefined> {
    const post = await this.dataSource.getRepository(SQLitePostEntity).findOne({
      where: { slug },
      relations: ['tags'],
    });

    return post ? PostEntity.reconstitute({ ...post }) : undefined;
  }

  public async createPost(post: PostEntity): Promise<void> {
    const storage = this.dataSource.getRepository(SQLitePostEntity);
    const data = post.toJSON();

    const sqlitePost = storage.create({
      id: data.id as string,
      title: data.title as string,
      slug: data.slug as string,
      content: data.content as string,
      status: data.status as PostStatus,
      authorId: data.authorId as string,
    });

    await storage.save(sqlitePost);
  }

  public async updatePost(id: string, post: PostEntity): Promise<void> {
    const storage = this.dataSource.getRepository(SQLitePostEntity);
    const data = post.toJSON();

    await storage.save({
      id: id,
      title: data.title as string,
      slug: data.slug as string,
      content: data.content as string,
      status: data.status as PostStatus,
      authorId: data.authorId as string,
    });
  }

  public async deletePost(id: string): Promise<void> {
    await this.dataSource.getRepository(SQLitePostEntity).delete(id);
  }
}
