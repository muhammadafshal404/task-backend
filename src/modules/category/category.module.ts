import { CategoryModel } from './model/category.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryService } from './service/category.service';
import { CategoryController } from './contoller/category.controller';
import { CarModule } from '../car/car.module';
@Module({
  imports: [SequelizeModule.forFeature([CategoryModel]), CarModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
