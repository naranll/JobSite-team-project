import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CateSchema, Category } from './category.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CateSchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class categoryModule {}
