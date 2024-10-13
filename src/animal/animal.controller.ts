import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { AnimalService, FindAnimalsOptions } from './animal.service';
import { CreateAnimalDto } from './animal.dto';
import { Animal } from './animal.schema';
import { SortOrder } from 'mongoose';


@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) { }

  @Get('search')
  async searchAnimals(@Query() queryParams: FindAnimalsOptions): Promise<{ animals: Animal[]; total: number }> {
    return this.animalService.findAnimals(queryParams);
  }

  // @Post()
  // create(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
  //   return this.animalService.create(createAnimalDto);
  // }

  @Get()
  findAll(): Promise<Animal[]> {
    return this.animalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Animal> {
    return this.animalService.findOne(id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateAnimalDto: CreateAnimalDto): Promise<Animal> {
  //   return this.animalService.update(id, updateAnimalDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<Animal> {
  //   return this.animalService.remove(id);
  // }

  // @Post('seed')
  // async seedData(): Promise<Animal[]> {
  //   return this.animalService.addMany();
  // }

 
}