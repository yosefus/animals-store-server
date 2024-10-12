import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './category.dto';
import categories from './fakeData';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(slug: string): Promise<Category> {
    return this.categoryModel.findOne({ slug }).exec();
  }

  async update(slug: string, updateCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.findOneAndUpdate({ slug }, updateCategoryDto, { new: true }).exec();
  }

  async remove(slug: string): Promise<Category> {
    return this.categoryModel.findOneAndDelete({ slug }).exec();
   }
   
   async test() {      
      return this.categoryModel.create(categories);
   }
}