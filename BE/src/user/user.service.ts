import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async createUser(user: User) {
    console.log('creating user');
    const newUser = new this.userModel(user);
    const result = await newUser.save();
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async generateStaticIdforUser(): Promise<User[]> {
    const query = await this.userModel.find({}).select({ _id: 1 });
    return query;
  }

  async findUser(id: string): Promise<User> {
    console.log('find user id', id);
    const result = await this.userModel.findById(id).exec();
    console.log('found User', result);
    return result;
  }

  async findByEmail(email: string) {
    console.log('finding by email', email);
    return await this.userModel.findOne({ email });
  }

  async signIn(email: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (user.password === pass) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
