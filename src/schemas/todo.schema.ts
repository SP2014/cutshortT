import { object, string, TypeOf } from 'zod';

export const createTodoSchema = object({
  body: object({
    title: string({ required_error: 'Title is required' }),
    description: string({ required_error: 'Description is required' }),
  }),
});

export type CreateTodoInput = TypeOf<typeof createTodoSchema>['body'];
