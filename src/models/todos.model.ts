import {
  getModelForClass,
  index,
  modelOptions,
  plugin,
  prop,
  Severity
} from '@typegoose/typegoose';
import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination';

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@plugin(paginationPlugin)
@index({userId:1})
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
