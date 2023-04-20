import { Date } from 'mongoose';

export class UserDto {
  firstName: string;
  lastName: string;
  gender: string;
  joinDate: Date;
  phoneNumber: string;
  email: string;
  skills: string[];
  role: string;
}
