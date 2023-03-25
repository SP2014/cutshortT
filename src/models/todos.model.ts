import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from '@typegoose/typegoose';
import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination';

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})
@plugin(paginationPlugin)
export class Todos {
  @prop({ required: true, unique: true })
  title: string;

  @prop({ required: true })
  description: string;

  @prop({ default: false })
  completed: boolean;

  @prop({ required: true })
  userId: string;
}

const todosModel = getModelForClass(Todos);
export default todosModel as PaginateModel<Todos, typeof Todos>;
