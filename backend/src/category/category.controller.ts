import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { Category } from './category.schema';
import { CategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('all')
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post('add')
  addCateList(@Body() body: CategoryDto): Promise<Category> {
    console.log('category req body: ', body);
    return this.categoryService.addCate(body);
  }
}
