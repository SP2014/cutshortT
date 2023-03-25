import { NextFunction, Request, Response } from 'express';
import {
  createTodo,
  deleteTodo,
  toggleTodo,
  getTodos,
} from '../services/todos.service';
import { IPaginateOptions } from 'typegoose-cursor-pagination';
import { Dictionary } from 'lodash';

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todo = await createTodo({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
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
    console.log(req.query);
    const admin = req.query.isAdmin as string;
    const userId = req.query.userId as string;
    const isAdmin = admin === 'true' ? true : false;
    var query: Dictionary<string> = {};

    if (!isAdmin) {
      Object.assign(query, { userId: userId });
    }

    const todos = await getTodos(query, options);
    res.status(200).json({
      status: 'success',
      data: todos,
    });
  } catch (error) {}
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
      deleteTodo(req.params.id).then((v) => {
        if (v != null) {
          res.status(200).json({
            status: 'success',
            msg: 'Todo deleted!!!!',
          });
        } else {
          res.status(400).json({
            status: false,
            msg: 'Todo not present',
          });
        }
      });
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

export const editTodo = async (
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
      const { id } = req.params;
    }
  } catch (error) {
    next(error);
  }
};
