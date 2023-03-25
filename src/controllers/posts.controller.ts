import { NextFunction, Request, Response } from 'express';
import { IPaginateOptions } from 'typegoose-cursor-pagination';
import { commentPost, createPost, getAllPosts, removePost } from '../services/post.service';

export const addPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await createPost(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (
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
    const allPosts = await getAllPosts(false, options, userId);
    res.status(200).json({
      status: 'success',
      data: allPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (
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
    const allPosts = await getAllPosts(true, options, undefined);
    res.status(200).json({
      status: 'success',
      data: allPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = res.locals.user;
    const pid = req.params.postId as string;
    var data = req.body;
    Object.assign(data, { postId: pid, userId: user._id });
    const comment = await commentPost(data);
    res.status(201).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    removePost(req.params.postId).then(()=>{
        res.status(200).json({
          'status':'success',
          'msg': 'Post deleted'
        });
    });
  } catch (error) {
    next(error);
  }
};