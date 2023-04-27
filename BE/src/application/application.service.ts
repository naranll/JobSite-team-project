import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Application } from "./application.schema";
import { ApplicationDto } from "./application.dto";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel("applications") private applicationModel: Model<Application>,
    @InjectConnection() private connection: Connection
  ) {}
  async addApp(createAppDto: ApplicationDto): Promise<Application> {
    const createApp = new this.applicationModel(createAppDto);
    return createApp.save();
  }
  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }
}
