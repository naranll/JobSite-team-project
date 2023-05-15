import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import mongoose, { now, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class Job {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  postedBy: Types.ObjectId;

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
