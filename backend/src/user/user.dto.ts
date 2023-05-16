import { Date } from 'mongoose';

export class UserDto {
  firstName: string;
  password: string;
  lastName: string;
  gender: string;
  joinDate: Date;
  phoneNumber: string;
  email: string;
  skills: string[];
  role: string;
}
