import { Injectable } from '@nestjs/common';
import { CarModel } from '../models/car.model';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from 'src/modules/category/model/category.model';
import { SORT_ORDER } from 'src/utils/constant';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(CarModel)
    private carModel: typeof CarModel,
  ) {}

  async createCar(body) {
    return await this.carModel.create(body);
  }

  async getCars({ perPage, pageNo, orderBy, order }) {
    let find = {};
    if (orderBy && order) {
      if (order === SORT_ORDER.ASC) {
        find['order'] = [[orderBy, 'ASC']];
      } else if (order === SORT_ORDER.DESC) {
        find['order'] = [[orderBy, 'DESC']];
      }
    }
    if (pageNo > 0 && perPage) {
      find['limit'] = perPage;
      find['offset'] = (pageNo - 1) * perPage;
    }
    return await this.carModel.findAndCountAll({
      ...find,
      include: {
        model: CategoryModel,
      },
    });
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
