import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  password: string;
  @Prop()
  gender: string;
  @Prop()
  joinDate: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  email: string;
  @Prop([String])
  skill: string[];
  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
