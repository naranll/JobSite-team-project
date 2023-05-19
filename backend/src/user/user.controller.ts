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
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    response.json({ token: token });
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Post('uploads')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    const storageRef = admin.storage().bucket().file(file.originalname);
    const metadata = {
      contentType: file.mimetype,
    };

    await storageRef.save(file.buffer, {
      metadata,
    });
    const url = await storageRef.getSignedUrl({
      action: 'read',
      expires: '03-01-2024 ',
    });
    return url[0];
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
    // if (file) {
    //   const imageUrl = await this.uploadFileToFirebase(file);
    //   userData.image = imageUrl;
    // }

    const updatedUser = await this.userService.updateUser(id, userData);
    if (updatedUser) {
      res.status(200).json({ message: true });
    } else {
      res.status(400).json({ message: false });
    }
  }

  // private async uploadFileToFirebase(
  //   file: Express.Multer.File,
  // ): Promise<string> {
  //   const { originalname, buffer, mimetype } = file;

  //   const ext = getExtension(originalname);
  //   // const generatedId = nanoid();
  //   const newName = nanoid() + '.' + ext;
  //   console.log('filename', newName);

  //   function getExtension(name: string) {
  //     const arr = name.split('.');
  //     return arr[arr.length - 1];
  //   }

  //   const blob = storageBucket.file(newName);
  //   const blobWriter = blob.createWriteStream({
  //     metadata: {
  //       contentType: mimetype,
  //     },
  //   });

  //   return new Promise((resolve, reject) => {
  //     blobWriter.on('finish', () => {
  //       const publicUrl = `https://storage.googleapis.com/${storageBucket.name}/${blob.name}`;
  //       resolve(publicUrl);
  //     });
  //     blobWriter.on('error', (error) => {
  //       reject(error);
  //     });
  //     blobWriter.end(buffer);
  //   });
  // }
}
