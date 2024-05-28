import { CategoryModel } from './model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryService } from './service/category.service';
import { CategoryController } from './contoller/category.controller';
@Module({
  imports: [SequelizeModule.forFeature([CategoryModel])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
