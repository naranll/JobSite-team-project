import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { now } from 'mongoose';

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job' })
  jobId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
  @Prop()
  state: string;
  @Prop({ default: now() })
  createdAt: Date;
}
export const ApplicationSchema = SchemaFactory.createForClass(Application);
