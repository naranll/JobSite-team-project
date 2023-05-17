import { Injectable } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectConnection() private connection: Connection,
  ) {}
  async addCate(createCateDto: CategoryDto): Promise<Category> {
    const createCate = new this.categoryModel(createCateDto);
    return createCate.save();
  }
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async updateCate(id: string, body: CategoryDto): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  async deleteCate(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
