import { Injectable } from '@nestjs/common';
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
}
