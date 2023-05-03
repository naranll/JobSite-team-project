import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
// import { HydratedDocument } from 'mongoose';

// export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  postedBy: mongoose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  payment: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);
