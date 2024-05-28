import { Injectable } from '@nestjs/common';
import { CarModel } from '../models/car.model';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from 'src/modules/category/model/category.model';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(CarModel)
    private carModel: typeof CarModel,
  ) {}

  async createCar(body) {
    return await this.carModel.create(body);
  }

  async getCars() {
    return await this.carModel.findAll();
  }

  async getCar(id: string) {
    return await this.carModel.findOne({
      where: { id },
      include: {
        model: CategoryModel,
      },
    });
  }

  async updateCar(body, id) {
    return await this.carModel.update(body, {
      where: { id },
    });
  }

  async deleteCar(id) {
    return await this.carModel.destroy({
      where: { id },
    });
  }

  async totalNumberofCars() {
    return await this.carModel.findAndCountAll();
  }

  async deleteCarOnCategoryDeletion(category_id, transaction) {
    return await this.carModel.destroy({ where: { category_id }, transaction });
  }
}
