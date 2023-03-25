import { omit } from 'lodash';
import postModel, { Post } from '../models/post.model';
import Comments from '../models/comments.model';
import { IPaginateOptions, IPaginateResult } from 'typegoose-cursor-pagination';

import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';

const userCache = new CacheContainer(new MemoryStorage());

export const createPost = async (input: Partial<Post>) => {
  const post = await postModel.create(input);
  return post.toJSON();
};

export const commentPost = async (input: any) => {
  const { postId, userId, text } = input;
  const post = await postModel.findOne({ _id: postId });
  const comment = new Comments(userId as string, text as string);
  var oldComments = post?.comments;
  oldComments?.push(comment);
  await postModel.findOneAndUpdate(
    { _id: postId },
    { comments: oldComments },
  );
  return oldComments;
};

export const getSinglePost = async (postId: string) => {
  const post = await postModel.findById(postId);
  if (post != null) {
    const comments = await postModel.find({ authorId: post.authorId });
    const res = { ...post, comments };
    return res;
  } else {
    return {};
  }
};

export const getAllPosts = async (
  isAdmin: boolean,
  options: IPaginateOptions,
  userId?: string,
) => {
  if (isAdmin) {
    const cachedPosts = await userCache.getItem<IPaginateResult<Post>>(
      'adminPosts',
    );
    if (cachedPosts) return cachedPosts;
    const posts = await postModel.findPaged(options, {}, {}, []);
    await userCache.setItem('adminPosts', posts, { ttl: 60 });
    return omit(posts);
  } else {
    console.log(userId);
    const cachedPosts = await userCache.getItem<IPaginateResult<Post>>(
      `${userId}posts`,
    );
    if (cachedPosts) return cachedPosts;
    const posts = await postModel.findPaged(
      options,
      { authorId: userId },
      {},
      [],
    );
    await userCache.setItem(`${userId}posts`, posts, { ttl: 60 });
    return posts;
  }
};

export const removePost = async (postId: string) => {
  return await postModel.findOneAndDelete({_id: postId});
};
