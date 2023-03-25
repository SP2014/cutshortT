import { NextFunction, Request, Response } from 'express';
import { IPaginateOptions } from 'typegoose-cursor-pagination';
import { commentPost, createPost, getAllPosts } from '../services/post.service';

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
    //console.log(req.query);
    const isAdmin = req.query.isAdmin as string;
    const userId = req.query.userId as string;
    const admin = isAdmin === 'true' ? true : false;

    const allPosts = await getAllPosts(admin, options, userId);
    res.status(200).json({
      status: 'success',
      data: allPosts,
    });
  } catch (error) {}
};

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comment = await commentPost(req.body);
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
