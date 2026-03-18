import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { TagSqliteEntity } from 'src/modules/tags/infrastructure/entities/tag.sqlite.entity';
import type { PostStatus } from '../../domain/entities/post.entity';

@Entity('posts')
export class SQLitePostEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: PostStatus;

  @Column()
  authorId: string;

  @ManyToMany(() => TagSqliteEntity)
  @JoinTable({
    name: 'posts_tags',
    joinColumn: { name: 'postId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: TagSqliteEntity[];
}
