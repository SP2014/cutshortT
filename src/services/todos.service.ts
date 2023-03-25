import { Dictionary, omit } from 'lodash';
import todosModel, { Todos } from '../models/todos.model';
import { IPaginateOptions } from 'typegoose-cursor-pagination';

export const createTodo = async (input: Partial<Todos>) => {
  const todo = await todosModel.create(input);
  return omit(todo.toJSON());
};

export const getTodos = async (
  query: Dictionary<string>,
  options: IPaginateOptions,
) => {
  console.log(query);
  return await todosModel.findPaged(options, query, {}, []);
};

export const editTodo = async (id: string, input: Partial<Todos>) => {
  return await todosModel.findByIdAndUpdate(id, input);
};

export const toggleTodo = async (id: string, val: boolean) => {
  return await todosModel.findOneAndUpdate({ _id: id }, { completed: val });
};

export const deleteTodo = async (id: string) => {
  return await todosModel.findByIdAndDelete(id);
};
