import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SORT_ORDER } from 'src/utils/constant';
import { Sequelize } from 'sequelize-typescript';
import { CategoryModel } from '../model/category.model';
import { CarModel } from 'src/modules/car/models/car.model';
import { CarService } from 'src/modules/car/service/car.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private categoryModel: typeof CategoryModel,
    private carService: CarService,
    private sequelize: Sequelize,
  ) {}
  async createCatory(body) {
    return await this.categoryModel.create(body);
  }

  async updateCategory(body, id) {
    return await this.categoryModel.update(body, { where: { id } });
  }

  async getCategories({ pageNo, perPage, orderBy }) {
    let find = {};
    if (orderBy) {
      if (orderBy === SORT_ORDER.ASC) {
        find['order'] = [['name', 'ASC']];
      } else if (orderBy === SORT_ORDER.DESC) {
        find['order'] = [['name', 'DESC']];
      }
    } else {
      find['order'] = [['updatedAt', 'DESC']];
    }
    if (pageNo > 0 && perPage) {
      find['limit'] = perPage;
      find['offset'] = (pageNo - 1) * perPage;
    }
    return await this.categoryModel.findAndCountAll(find);
  }

  async deleteCategory(id) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.categoryModel.destroy({ where: { id }, transaction });
      await this.carService.deleteCarOnCategoryDeletion(id, transaction);
      await transaction?.commit();
      return;
    } catch (err) {
      await transaction?.rollback();
      throw new Error(err);
    }
  }

  async getCategory(id) {
    return await this.categoryModel.findOne({
      where: { id },
      include: {
        model: CarModel,
      },
    });
  }
}
