import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './user.schema';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async addUser(createUserDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUser(id: string): Promise<User> {
    console.log('find user id', id);
    const result = await this.userModel.findById(id).exec();
    console.log('found User', result);
    return result;
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
