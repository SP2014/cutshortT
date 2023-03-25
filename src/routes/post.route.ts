import express from 'express';
import { addComment, addPost, getPosts } from '../controllers/posts.controller';
const router = express.Router();

router.post('/', addPost);

router.get('/', getPosts);

router.post('/comment', addComment);

export default router;
