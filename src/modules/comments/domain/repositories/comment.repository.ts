import { CommentEntity } from '../entities/comment.entity';

export abstract class CommentRepository {
  public abstract getCommentsByPostId(postId: string): Promise<CommentEntity[]>;

  public abstract createComment(comment: CommentEntity): Promise<void>;

  public abstract deleteComment(id: string): Promise<void>;
}
