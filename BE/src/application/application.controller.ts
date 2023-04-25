import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './application.schema';
import { ApplicationDto } from './application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Get('all')
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Post('add')
  addAppList(@Body() body: ApplicationDto): Promise<Application> {
    console.log('req body:', body);
    return this.applicationService.addApp(body);
  }
}
