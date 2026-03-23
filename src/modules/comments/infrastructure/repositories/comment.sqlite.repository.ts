import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CommentEntity } from '../../domain/entities/comment.entity';
import { CommentRepository } from '../../domain/repositories/comment.repository';
import { CommentSqliteEntity } from '../entities/comment.sqlite.entity';

@Injectable()
export class SQLiteCommentRepository implements CommentRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async createComment(comment: CommentEntity): Promise<void> {
    const storage = this.dataSource.getRepository(CommentSqliteEntity);
    const data = comment.toJSON();

    const sqliteComment = storage.create({
      id: data.id as string,
      content: data.content as string,
      authorId: data.authorId as string,
      postId: data.postId as string,
      createdAt: new Date(data.createdAt as string),
    });

    await storage.save(sqliteComment);
  }

  public async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
    const comments = await this.dataSource
      .getRepository(CommentSqliteEntity)
      .find({
        where: { postId },
        order: { createdAt: 'ASC' },
      });

    return comments.map((comment) =>
      CommentEntity.reconstitute({ ...comment }),
    );
  }

  public async deleteComment(id: string): Promise<void> {
    await this.dataSource.getRepository(CommentSqliteEntity).delete(id);
  }
}
