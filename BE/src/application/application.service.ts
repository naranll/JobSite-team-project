import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ApplicationDto } from './application.dto';
import { AppList } from './application.schema';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel('Applications') private applicationModel: Model<AppList>,
    @InjectConnection() private connection: Connection,
  ) {}
  async addApp(createAppDto: ApplicationDto): Promise<AppList> {
    const createApp = new this.applicationModel(createAppDto);
    return createApp.save();
  }
  async findAll(): Promise<AppList[]> {
    return this.applicationModel.find().exec();
  }
}
