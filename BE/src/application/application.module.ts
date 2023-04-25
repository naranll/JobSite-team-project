import { Module } from '@nestjs/common';
import { ApplicationSchema } from './application.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'applications', schema: ApplicationSchema },
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class applicationModule {}
