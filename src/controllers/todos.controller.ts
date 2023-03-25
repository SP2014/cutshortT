import { NextFunction, Request, Response } from 'express';
import {
  createTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  getTodos,
  getTodoById,
} from '../services/todos.service';
import { IPaginateOptions } from 'typegoose-cursor-pagination';
import { Dictionary } from 'lodash';
import { CreateTodoInput } from '../schemas/todo.schema';
import AppError from '../utils/appError';
import { FilterQuery } from 'mongoose';
import { Todos } from 'src/models/todos.model';

export const addTodo = async (
  req: Request<{}, {}, CreateTodoInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = res.locals.user;
    const todo = await createTodo({
      title: req.body.title,
      description: req.body.description,
      userId: user._id,
    });
    res.status(201).json({
      status: 'success',
      data: {
        todo,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTodosForUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const options: IPaginateOptions = {
    sortField: 'updatedAt',
    sortAscending: true,
    limit: 10,
    next: req.query.next as string,
  };
  try {
    const userId = req.params.userId as string;
    var query: FilterQuery<Todos> = {};
    Object.assign(query, { userId: userId });

    const todos = await getTodos(query, options);
    res.status(200).json({
      status: 'success',
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const options: IPaginateOptions = {
    sortField: 'updatedAt',
    sortAscending: true,
    limit: 10,
    next: req.query.next as string,
  };

  try {
    var query: Dictionary<string> = {};
    const todos = await getTodos(query, options);
    res.status(200).json({
      status: 'success',
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

export const removeTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.params.id) {
      return res.status(422).json({
        status: 'false',
        msg: 'Wrong parameters!!!',
      });
    } else {
      const user = res.locals.user;
      const oldTodo = await getTodoById(req.params.id);
      if (oldTodo?.userId === user._id || user.role === 'admin') {
        const d = await deleteTodo(req.params.id);
        res.status(200).json({
          status: 'success',
          msg: 'Todo deleted!!!!',
        });
      } else {
        return next(
          new AppError('You are not allowed to perform this action', 403),
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const toggleStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.params.id) {
      return res.status(422).json({
        status: 'false',
        msg: 'Wrong parameters!!!',
      });
    } else {
      const { id, val } = req.params;
      const todoStatus = val === 'true' ? true : false;
      toggleTodo(id, todoStatus);
    }
  } catch (error) {
    next(error);
  }
};

export const editTodoForUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.params.id) {
      return res.status(422).json({
        status: 'false',
        msg: 'Wrong parameters!!!',
      });
    } else {
      const user = res.locals.user;
      const oldTodo = await getTodoById(req.params.id);
      //console.log(oldTodo);
      if (oldTodo?.userId === user._id || user.role === 'admin') {
        editTodo(req.params.id, req.body).then(()=>{
          res.status(200).json({
            status: 'success'
          });
        });
      } else {
        return next(
          new AppError('You are not allowed to perform this action', 403),
        );
      }
    }
  } catch (error) {
    next(error);
  }
};
