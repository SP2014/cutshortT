import { Dictionary, omit } from 'lodash';
import todosModel, { Todos } from '../models/todos.model';
import { IPaginateOptions, IPaginateResult } from 'typegoose-cursor-pagination';

import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { FilterQuery } from 'mongoose';

const userCache = new CacheContainer(new MemoryStorage());

export const createTodo = async (input: Partial<Todos>) => {
  const todo = await todosModel.create(input);
  return omit(todo.toJSON());
};

export const getTodoById = async (id: string) => {
  return await todosModel.findOne({ _id: id });
};

export const getTodos = async (
  query: FilterQuery<Todos>,
  options: IPaginateOptions,
) => {
  var cachedTodos;
  var key;
  if ('userId' in query) {
    key = `${query.userId}Todos`;
  } else {
    key = 'adminTodos';
  }
  cachedTodos = await userCache.getItem<IPaginateResult<Todos>>(key);
  if (cachedTodos) return cachedTodos;
  else {
    const todos = await todosModel.findPaged(options, query, {}, []);
    await userCache.setItem(key, todos, { ttl: 60 });
    return todos;
  }

};

export const editTodo = async (id: string, input: Partial<Todos>) => {
  return await todosModel.findOneAndUpdate({ _id: id }, input);
};

export const toggleTodo = async (id: string, val: boolean) => {
  return await todosModel.findOneAndUpdate({ _id: id }, { completed: val });
};

export const deleteTodo = async (id: string) => {
  return await todosModel.findByIdAndDelete(id);
};
