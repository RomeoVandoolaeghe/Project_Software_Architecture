export type PostModel = {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'waiting_validation' | 'accepted' | 'rejected';
  authorId: string;
};

export type CreatePostModel = {
  title: string;
  content: string;
  authorId: string;
  status: PostModel['status'];
};

export type UpdatePostModel = Partial<CreatePostModel>;

export abstract class PostRepository {
  public abstract getPosts(): PostModel[];

  public abstract getPostById(id: string): PostModel | undefined;

  public abstract createPost(input: CreatePostModel): void;

  public abstract updatePost(id: string, input: UpdatePostModel): void;

  public abstract deletePost(id: string): void;
}
