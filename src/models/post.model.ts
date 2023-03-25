import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from '@typegoose/typegoose';
import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination';
import Comments from './comments.model';

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})
@plugin(paginationPlugin)
export class Post {
  @prop({ required: true })
  text: string;

  @prop({ required: true })
  authorId: string;

  @prop()
  comments: Comments[];
}

const postModel = getModelForClass(Post);

export default postModel as PaginateModel<Post, typeof Post>;
