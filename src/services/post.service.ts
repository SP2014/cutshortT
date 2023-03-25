import { omit } from 'lodash';
import postModel, { Post } from '../models/post.model';
import Comments from '../models/comments.model';
import { IPaginateOptions, IPaginateResult } from 'typegoose-cursor-pagination';

import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';

const userCache = new CacheContainer(new MemoryStorage());

export const createPost = async (input: Partial<Post>) => {
  const post = await postModel.create(input);
  return omit(post.toJSON());
};

export const commentPost = async (input: any) => {
  const { postId, userId, text } = input;
  const post = await postModel.findOne({ _id: postId });
  const comment = new Comments(userId as string, text as string);
  var oldComments = post?.comments;
  oldComments?.push(comment);
  const newpost = await postModel.findOneAndUpdate(
    { _id: postId },
    { comments: oldComments },
  );
  return omit({});
};

export const getSinglePost = async (postId: string) => {
  const post = await postModel.findById(postId);
  if (post != null) {
    const comments = await postModel.find({ authorId: post.authorId });
    const res = { ...post, comments };
    return omit(res);
  } else {
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
    const cachedPosts = await userCache.getItem<IPaginateResult<Post>>(
      `${userId}posts`,
    );
    if (cachedPosts) return cachedPosts;
    const posts = await postModel.findPaged(
      options,
      { authorId: { $ne: userId } },
      {},
      [],
    );
    await userCache.setItem(`${userId}posts`, posts, { ttl: 60 });
    return omit(posts);
  }
};
