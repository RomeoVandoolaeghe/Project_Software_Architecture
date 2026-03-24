export const PostCreatedEvent = 'post.created';

export type PostCreatedEventPayload = {
  id: string;
  title: string;
  authorId: string;
};
