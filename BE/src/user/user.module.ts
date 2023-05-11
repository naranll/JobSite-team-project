import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // useFactory: async (configService: ConfigService) => ({
      //   secret: configService.get<string>('JWT_SECRET'),
      //   secret: process.env.JWT_SECRET,
      //   signOptions: { expiresIn: '1h' },
      // }),
      useFactory: async (configService: ConfigService) => {
        console.log('JWT_SECRET:', configService.get<string>('JWT_SECRET'));
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserModule {}

// JwtModule.register({
//   global: true
//   secret: process.env.JWT_SECRET,
//   signOptions: { expiresIn: '1h' },
// }),
