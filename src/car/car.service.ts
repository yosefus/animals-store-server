import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './car.schema';
import { CreateCarDto } from './car.dto';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async createCar(createCarDto: CreateCarDto): Promise<Car> {
    const createdCar = new this.carModel(createCarDto);
    return createdCar.save();
  }

  async findAllCars(): Promise<Car[]> {
    return this.carModel.find().exec();
  }

  async findCarById(id: string): Promise<Car> {
    return this.carModel.findById(id).exec();
  }

  async updateCar(id: string, updateCarDto: CreateCarDto): Promise<Car> {
    return this.carModel.findByIdAndUpdate(id, updateCarDto, { new: true }).exec();
  }

  async deleteCar(id: string): Promise<Car> {
    return this.carModel.findByIdAndDelete(id).exec();
  }
}
