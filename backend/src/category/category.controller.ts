import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put(':id')
  updateCate(
    @Param('id') id: string,
    @Body() body: CategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCate(id, body);
  }

  @Delete(':id')
  deleteCate(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteCate(id);
  }
}
