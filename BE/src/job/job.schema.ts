import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import mongoose, { now } from 'mongoose';
// import { HydratedDocument } from 'mongoose';

// export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  postedBy: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  wage: number;

  @Prop()
  requirement: string;

  @Prop()
  location: string;

  @Prop()
  contactType: string;

  @Prop()
  category: string;

  @Prop({ default: now() })
  createdDate: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
