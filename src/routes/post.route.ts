import express from 'express';
import { addComment, addPost, deletePost, getPosts, getUserPosts } from '../controllers/posts.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createPostSchema } from '../schemas/post.schema';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

router.post('/', validate(createPostSchema), addPost);

router.get('/', restrictTo('admin'), getPosts);

router.get('/user/:userId', getUserPosts);

router.post('/:postId/comment', addComment);

router.delete('/:postId', restrictTo('admin'), deletePost);

export default router;
