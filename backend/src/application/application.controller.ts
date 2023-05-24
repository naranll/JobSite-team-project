import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request as Req,
  Response as Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApplicationService } from './application.service';
import { Application } from './application.schema';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Get('all')
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Post('check')
  async checkIfApplied(@Req() Req: Request, @Res() Res: Response) {
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
  async addAppList(@Req() req: Request, @Res() res: Response) {
    const { userId, jobId } = req.body;
    try {
      const result = await this.applicationService.isApplied(userId, jobId);
      if (!result) {
        const response = await this.applicationService.addApp(req.body);
        return res.status(200).json({ success: true, data: response });
      } else {
        return res.status(409).json({
          success: false,
          message: 'you already applied to this job',
        });
      }
    } catch (error) {
      error.message;
    }
  }

  @Get('/id/:applicationId')
  getApplicationById(
    @Param('applicationId') applicationId: string,
  ): Promise<Application[] | void> {
    console.log('applicationId: ', applicationId);
    try {
      return this.applicationService.getApplicationById(applicationId);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/userId/:id')
  getAppliedJobsByUserId(@Param('id') userId: string): Promise<Application[]> {
    return this.applicationService.getAppliedJobsByUserId(userId);
  }

  @Get('/jobId/:jobId')
  getApplicantsByJobId(@Param('jobId') jobId: string): Promise<Application[]> {
    return this.applicationService.getApplicantsByJobId(jobId);
  }

  // @Get('application_id')
  // getStaticId(): Promise<Application[]> {
  //   return this.applicationService.generateStaticId();
  // }

  @Delete('/remove/:id')
  async removeApplication(@Req() Req: Request, @Res() Res: Response) {
    const { userId, jobId } = Req.body;
    const result = await this.applicationService.cancelApply(userId, jobId);
    if (result) {
      Res.status(200).json({ message: true });
    } else {
      Res.status(400).json({ message: 'something went wrong' });
    }
  }
}
