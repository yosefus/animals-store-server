import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';
import { Category } from './category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string): Promise<Category> {
    return this.categoryService.findOne(slug);
  }

  @Put(':slug')
  update(@Param('slug') slug: string, @Body() updateCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.update(slug, updateCategoryDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string): Promise<Category> {
    return this.categoryService.remove(slug);
   }
   
   @Post('test')
   test() {
      console.log('1');
      return this.categoryService.test();
   }
}