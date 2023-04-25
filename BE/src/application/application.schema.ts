import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AppList {
  @Prop()
  title: string;
}
export const ApplicationSchema = SchemaFactory.createForClass(AppList);
