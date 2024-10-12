import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return this.carService.createCar(createCarDto);
  }

  @Get()
  async findAll() {
    return this.carService.findAllCars();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carService.findCarById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: CreateCarDto) {
    return this.carService.updateCar(id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.carService.deleteCar(id);
  }
}
