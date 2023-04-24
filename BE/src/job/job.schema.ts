import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';

// export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  payment: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);
