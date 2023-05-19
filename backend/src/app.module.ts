import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { jobModule } from './job/job.module';
import { applicationModule } from './application/application.module';
import { GoogleLoginModule } from './googleLogin/googleLogin.module';
import { categoryModule } from './category/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './fileHandler/multer.config';
import { FirebaseAdmin } from 'nestjs-firebase';
import { firebaseApp } from './fileHandler/firebase.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_DB_CONNECT}`),
    UserModule,
    jobModule,
    applicationModule,
    categoryModule,
    GoogleLoginModule,

    MulterModule.register(multerConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
