import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('comments')
export class CommentSqliteEntity {
  @PrimaryColumn()
  id: string;

  @Column('text')
  content: string;

  @Column()
  authorId: string;

  @Column()
  postId: string;

  @Column()
  createdAt: Date;
}
