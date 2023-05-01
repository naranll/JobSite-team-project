import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  id?: string;
  @Prop()
  name: string;
}

export const CateSchema = SchemaFactory.createForClass(Category);
