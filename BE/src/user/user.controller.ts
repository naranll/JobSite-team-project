import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request as Req,
  Response as Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('all')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('user_id')
  getStaticId(): Promise<User[]> {
    console.log('generating static paths for user');
    return this.userService.generateStaticIdforUser();
  }

  @Post('add')
  createUser(@Body() body: User): Promise<User> {
    console.log('request body', body);
    return this.userService.createUser(body);
  }

  @Post('login')
  async logIn(@Req() request: Request, @Res() response: Response) {
    const { email, password } = request.body;
    const user = await this.userService.logIn(email, password);
    const payload = { ...user };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    response.json({ token: token }).cookie('token', token);
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }
}
