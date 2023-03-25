import { object, string, TypeOf } from 'zod';

export const createPostSchema = object({
  body: object({
    text: string({ required_error: 'Text is required' }),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>['body'];
