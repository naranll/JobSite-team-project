import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './application.schema';
import { ApplicationDto } from './application.dto';
// import { Job } from 'src/job/job.schema';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Get('all')
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Post('add')
  async addAppList(@Body() body: Application): Promise<Application> {
    console.log('application add request');
    console.log('req body:', body);
    try {
      const result = await this.applicationService.isApplied(
        body.userId,
        body.jobId,
      );
      console.log('is applied result', result);
      if (!result) {
        return this.applicationService.addApp(body);
      } else {
        throw new HttpException('already applied', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      error.message;
    }
  }

  @Get('/:id')
  getAppliadJobsByUserId(@Param('id') userId: string): Promise<Application[]> {
    console.log('user id', userId);
    return this.applicationService.getAppliedJobsByUserId(userId);
  }

  @Get('/applicants/:jobId')
  getApplicantsByJobId(@Param('jobId') jobId: string): Promise<Application[]> {
    return this.applicationService.getApplicantsByJobId(jobId);
  }
}
