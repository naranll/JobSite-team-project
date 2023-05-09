import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request as Req,
  Response as Res,
} from '@nestjs/common';
import { Request, Response, query } from 'express';
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

  @Post('check')
  async checkIfApplied(@Req() Req: Request, @Res() Res: Response) {
    console.log('check if user applied', Req.body);
    const { userId, jobId } = Req.body;
    try {
      const result = await this.applicationService.checkApplied(userId, jobId);
      if (result) {
        Res.status(200).json({ message: true });
      } else {
        Res.status(200).json({ message: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Post('add')
  async addAppList(@Req() Req: Request, @Res() Res: Response) {
    console.log('application add request');
    console.log('req body:', Req.body);
    const { userId, jobId } = Req.body;
    try {
      const result = await this.applicationService.isApplied(userId, jobId);
      console.log('is applied result', result);
      if (!result) {
        const response = await this.applicationService.addApp(Req.body);
        return Res.status(200).json({ success: true, data: response });
      } else {
        return Res.status(409).json({
          success: false,
          message: 'you already applied to this job',
        });
      }
    } catch (error) {
      error.message;
    }
  }

  @Get('/:id')
  getAppliedJobsByUserId(@Param('id') userId: string): Promise<Application[]> {
    console.log('user id', userId);
    return this.applicationService.getAppliedJobsByUserId(userId);
  }

  @Get('/applicants/:jobId')
  getApplicantsByJobId(@Param('jobId') jobId: string): Promise<Application[]> {
    return this.applicationService.getApplicantsByJobId(jobId);
  }

  @Get('application_id')
  getStaticId(): Promise<Application[]> {
    console.log('generating static paths for application');
    return this.applicationService.generateStaticId();
  }

  @Delete('/remove/:id')
  async removeApplication(@Req() Req: Request, @Res() Res: Response) {
    console.log('delete Application request', Req.body);
    const { userId, jobId } = Req.body;
    const result = await this.applicationService.cancelApply(userId, jobId);
    if (result) {
      Res.status(200).json({ message: true });
    } else {
      Res.status(400).json({ message: 'something went wrong' });
    }
  }
}
