import express from 'express';
import {
  addTodo,
  editTodo,
  getAllTodos,
  removeTodo,
} from '../controllers/todos.controller';

const router = express.Router();

router.post('/', addTodo);

router.get('/', getAllTodos);

router.put('/id', editTodo);

router.delete('/:id', removeTodo);

export default router;
