import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Request as Req,
  Response as Res,
} from '@nestjs/common';
import * as queryString from 'query-string';
import { getAccessTokenFromCode } from './getAccessTokenFromCode';
import { getGoogleUserInfo } from './getGoogleUserInfo';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.schema';
import { Request, Response } from 'express';

@Controller()
export class GoogleLoginController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Get('google-login')
  googleLogin() {
    console.log('google login Request');

    const stringifiedParams = queryString.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: `http://localhost:${process.env.PORT}/google/callback`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
  }

  @Get('google/callback')
  async verifyGoogle(@Req() req: Request, @Res() res: Response) {
    console.log('google callback');
    const { code } = req.query;

    if (!code)
      throw new HttpException('Bad Request code', HttpStatus.BAD_REQUEST);

    const accessToken = await getAccessTokenFromCode(code);
    if (!accessToken)
      throw new HttpException('Bad Request token', HttpStatus.BAD_REQUEST);

    const profile: any = await getGoogleUserInfo(accessToken);
    console.log('google user info', profile.email);

    let user = await this.userService.findByEmail(profile.email);

    if (!user) {
      const userInput: User = {
        email: profile.email,
        role: 'CLIENT',
        firstName: profile.given_name,
        lastName: profile.family_name,
        password: null,
        gender: null,
        skills: [],
        phoneNumber: null,
        image: profile.picture,
      };
      user = await this.userService.createUser(userInput);
    }

    const payload = {
      firstName: user.firstName,
      email: user.email,
      _id: user._id,
      image: user.image,
    };
    // const token = await this.jwtService.signAsync(payload);
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    console.log('google token on be', this.jwtService.decode(token));

    res
      .status(200)
      .cookie('token', token)
      .redirect(`http://localhost:${process.env.CLIENT_PORT}`);
  }
}
