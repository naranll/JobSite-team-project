import {
  Injectable,
  UnauthorizedException,
  UploadedFile,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './user.schema';
import { admin } from 'src/fileHandler/firebase.config';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async createUser(user: User) {
    console.log('create user service called');
    const newUser = new this.userModel(user);
    const result = await newUser.save();
    console.log('new user added', result);
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
    return result;
  }

  async findByEmail(email: string) {
    console.log('finding by email', email);
    return await this.userModel.findOne({ email });
  }

  async logIn(email: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (user.password === pass) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    console.log('userId', id);
    console.log('user data', userData);
    const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, {
      new: true,
    });
    return updatedUser;
  }

  async upDateCV(id: string, url: string): Promise<User> {
    const cv = { cv: url}
    const updateUser = await this.userModel.findByIdAndUpdate(id, cv, { new: true });
    return updateUser
  }

  async uploadToFirebase(file: Express.Multer.File): Promise<string>{
    const {originalname, buffer, mimetype} = file

    const ext = getExtension(originalname);
    const newName = nanoid() + '.' + ext;
    console.log('filename', newName);

    function getExtension(name: string) {
      const arr = name.split('.');
      return arr[arr.length - 1];
    }
    const storageRef = admin.storage().bucket().file(newName);
    const metadata = {
      contentType: mimetype,
    };

    await storageRef.save(buffer, {
      metadata,
    });
    const url = await storageRef.getSignedUrl({
      action: 'read',
      expires: '03-01-2024 ',
    });
    return url[0];
  } 
}

