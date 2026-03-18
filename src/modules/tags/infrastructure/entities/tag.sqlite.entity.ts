import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tags')
export class TagSqliteEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
