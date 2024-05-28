import { CategoryModel } from '../model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private categoryModel: typeof CategoryModel,
  ) {}
  async createCatory(body) {
    return await this.categoryModel.create(body);
  }

  async updateCategory(body, id) {
    return await this.categoryModel.update(body, { where: { id } });
  }

  async getCategories() {
    return await this.categoryModel.findAll();
  }

  async deleteCategory(id) {
    return await this.categoryModel.destroy({ where: { id } });
  }

  async getCategory(id) {
    return await this.categoryModel.findOne({ where: { id } });
  }
}
