import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { Animal, AnimalDocument } from './animal.schema';
import { Category, CategoryDocument } from '../category/category.schema';
import { CreateAnimalDto } from './animal.dto';
import animals from './animals';

export interface FindAnimalsOptions {
  search?: string;
  searchFields?: string;
  sort?: string;
  populate?: string;
  limit?: string;
  page?: string;
}

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) { }

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const createdAnimal = new this.animalModel(createAnimalDto);
    return createdAnimal.save();
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().populate('category').exec();
  }

  async findOne(id: string): Promise<Animal> {
    return this.animalModel.findById(id).populate('category').exec();
  }

  async update(id: string, updateAnimalDto: CreateAnimalDto): Promise<Animal> {
    return this.animalModel.findByIdAndUpdate(id, updateAnimalDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Animal> {
    return this.animalModel.findByIdAndDelete(id).exec();
  }

  async addMany(): Promise<Animal[]> {
    const categories = await this.categoryModel.find().exec();

    const categoryMap = new Map(categories.map(cat => [cat.slug, cat._id]));

    const animalsWithCategories = animals.map(animal => ({
      ...animal,
      category: categoryMap.get(animal.category)
    }));

    return this.animalModel.create(animalsWithCategories);
  }

  async findAnimals(options: FindAnimalsOptions): Promise<{ animals: Animal[]; total: number }> {
    const {
      search,
      searchFields = 'name,description',
      sort = 'name:asc',
      populate = 'false',
      limit,
      page = '1'
    } = options;

    let query = this.animalModel.find();

    if (search) {
      console.log({ search });

      const fields = searchFields.split(',');
      const searchConditions = fields.map(field => ({
        [field.trim()]: { $regex: search, $options: 'i' }
      }));
      query = query.or(searchConditions);
    }

    const total = await this.animalModel.countDocuments(query);

    const [sortField, sortOrder] = sort.split(':');
    const sortOptions: { [key: string]: SortOrder } = {
      [sortField]: sortOrder === 'desc' ? -1 : 1
    };

    query = query.sort(sortOptions);
    
    if (limit) {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      if (isNaN(pageNum) || isNaN(limitNum)) {
        throw new BadRequestException('Invalid page or limit parameter');
      }
      query = query.skip((pageNum - 1) * limitNum).limit(limitNum);
    }

    if (populate.toLowerCase() === 'true') {
      query = query.populate('category');
    }

    const animals = await query.exec();

    return { animals, total };
  }

}