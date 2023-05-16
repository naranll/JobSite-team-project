import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  password?: string;
  @Prop()
  gender?: string;
  @Prop({ default: now() })
  joinDate?: Date;
  @Prop()
  phoneNumber?: string;
  @Prop()
  email: string;
  @Prop([String])
  skills: string[];
  @Prop({ default: 'ClIENT' })
  role: 'CLIENT' | 'MODERATOR' | 'ADMIN';
  @Prop()
  image?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
