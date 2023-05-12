import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { now } from 'mongoose';

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: mongoose.Schema.Types.String, ref: 'Job' })
  jobId: string;
  @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  userId: string;
  @Prop({ default: 'PENDING' })
  state: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  @Prop({ default: now() })
  createdDate: Date;
  @Prop({ default: now() })
  updatedDate: Date;
}
export const ApplicationSchema = SchemaFactory.createForClass(Application);
