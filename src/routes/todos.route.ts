import express from 'express';
import {
  addTodo,
  editTodoForUser,
  getAllTodos,
  getTodosForUser,
  removeTodo,
} from '../controllers/todos.controller';
import { validate } from '../middleware/validate';
import { createTodoSchema } from '../schemas/todo.schema';
import { requireUser } from '../middleware/requireUser';
import { deserializeUser } from '../middleware/deserializeUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Add a new Todo
router.post('/', validate(createTodoSchema), addTodo);

// Get all users Todo's
router.get('/', restrictTo('admin'), getAllTodos);

// Get all Todos for specified user
router.get('/user/:userId', getTodosForUser);

// Edit Todo
router.put('/:id', editTodoForUser);

// Delete Todo
router.delete('/:id', removeTodo);

export default router;
