import { Module } from '@nestjs/common';
import { CategoryController } from './contoller/category.controller';
import { CategoryService } from './service/category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
