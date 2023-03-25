import express, { Request, Response, NextFunction } from 'express';
import user from './user.route';
import todos from './todos.route';
import posts from './post.route';
import auth from './auth.route';

const router = express.Router();

router.get(
  '/healthChecker',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to Cutshort',
    });
  },
);

router.use(auth);
router.use(user);
router.use(todos);
router.use(posts);

// router.all('*', (req: Request, res: Response, next: NextFunction) => {
//     const err = new Error(`Route ${req.originalUrl} not found`) as any;
//     err.statusCode = 404;
//     next(err);
// });

// router.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     err.status = err.status || 'error';
//     err.statusCode = err.statusCode || 500;

//     res.status(err.statusCode).json({
//         status: err.status,
//         message: err.message,
//     });
// });

export default router;
