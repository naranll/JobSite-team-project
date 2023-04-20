import { Module } from '@nestjs/common';
import { JobSchema } from './job.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
<<<<<<< HEAD
  imports: [MongooseModule.forFeature([{ name: 'jobs', schema: JobSchema }])],
=======
  imports: [MongooseModule.forFeature([{ name: 'title', schema: JobSchema }])],
>>>>>>> 222329b (job-crud)
  controllers: [JobController],
  providers: [JobService],
})
export class jobModule {}
