import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Request as Req,
  Response as Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Multer } from 'multer';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
// import { firebaseApp, storageBucket } from 'src/fileHandler/firebase.service';
import { nanoid } from 'nanoid';
import { admin } from 'src/fileHandler/firebase.config';
import { FileUploadService } from 'src/fileHandler/upload-file.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly fileUploadService: FileUploadService,
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
  async createUser(@Req() request: Request, @Res() response: Response) {
    try {
      await this.userService.createUser(request.body);
      response.status(200).json({ success: true });
    } catch (error) {
      response.status(500).json({ success: false });
    }
  }

  @Post('login')
  async logIn(@Req() request: Request, @Res() response: Response) {
    const { email, password } = request.body;
    const user: any = await this.userService.logIn(email, password);
    const payload = {
      firstName: user.firstName,
      email: user.email,
      _id: user._id,
      image: user.image,
      role: user.role,
    };
    // const payload = { ...user };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    response.json({ token: token });
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Post('/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {

    const fileBuffer = file.buffer
    const fileName = file.originalname;

    const url = await this.fileUploadService.uploadFile(fileBuffer, fileName)

    const updateUser = await this.userService.upDateCV(id, url)
    if(updateUser){
      res.status(200).json({ success: true })
    } else {
      res.status(500).json({ success: false })
    }
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateUser(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const { data, skills } = req.body;
    console.log('data', data);
    console.log('skills', skills);

    const userData = {
      ...JSON.parse(data),
    };
    if (skills) {
      userData.skills = JSON.parse(skills);
    }
    if (file) {
      const imageUrl = await this.userService.uploadToFirebase(file);
      userData.image = imageUrl;
    }

    const updatedUser = await this.userService.updateUser(id, userData);
    if (updatedUser) {
      res.status(200).json({ message: true });
    } else {
      res.status(400).json({ message: false });
    }
  }
}
