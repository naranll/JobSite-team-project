import { Module } from '@nestjs/common';
import { JobSchema } from './job.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'jobs', schema: JobSchema }])],
  controllers: [JobController],
  providers: [JobService],
})
export class jobModule {}
