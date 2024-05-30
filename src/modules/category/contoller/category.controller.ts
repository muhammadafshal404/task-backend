import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createCategoryDto } from '../dto';
import { CategoryService } from '../service/category.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post('/')
  async createCategory(@Body() body: createCategoryDto) {
    try {
      return await this.categoryService.createCatory(body);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Patch('/:id')
  async updateCategory(@Body() body: createCategoryDto, @Param() { id }) {
    try {
      return await this.categoryService.updateCategory(body, id);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('/')
  async getCategories(@Query() { pageNo, perPage }) {
    try {
      return await this.categoryService.getCategories({ pageNo, perPage });
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('/:id')
  async getCategory(@Param() { id }) {
    try {
      return await this.categoryService.getCategory(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Delete('/:id')
  async deleteCategory(@Param() { id }) {
    try {
      return await this.categoryService.deleteCategory(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}
