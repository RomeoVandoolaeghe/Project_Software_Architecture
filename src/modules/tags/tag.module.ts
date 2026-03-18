import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entité TypeORM
import { TagSqliteEntity } from './infrastructure/entities/tag.sqlite.entity';

// Contrôleur
import { TagController } from './infrastructure/controllers/tag.controller';

// Use Cases
import { CreateTagUseCase } from './application/use-cases/create-tag.use-case';
import { ListTagsUseCase } from './application/use-cases/list-tags.use-case';
import { UpdateTagUseCase } from './application/use-cases/update-tag.use-case';
import { DeleteTagUseCase } from './application/use-cases/delete-tag.use-case';

// Repository & Token
import { TagSqliteRepository } from './infrastructure/repositories/tag.sqlite.repository';
import { TAG_REPOSITORY_TOKEN } from './domain/repositories/tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagSqliteEntity])],
  controllers: [TagController],
  providers: [
    // Déclaration des Use Cases
    CreateTagUseCase,
    ListTagsUseCase,
    UpdateTagUseCase,
    DeleteTagUseCase,

    // Injection du Repository
    {
      provide: TAG_REPOSITORY_TOKEN,
      useClass: TagSqliteRepository,
    },
  ],
  exports: [TAG_REPOSITORY_TOKEN],
})
export class TagModule {}
