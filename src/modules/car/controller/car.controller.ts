import { CarService } from '../service/car.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarDto, CarIdDto } from '../dto';

@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Post('/')
  async createCar(@Body() body: CarDto) {
    try {
      return await this.carService.createCar(body);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('/')
  async getCars() {
    try {
      return await this.carService.getCars();
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('/:id')
  async getCar(@Param() { id }: CarIdDto) {
    try {
      return await this.carService.getCar(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Put('/:id')
  async updateCar(@Body() body: CarDto, @Param() { id }: CarIdDto) {
    try {
      return await this.carService.updateCar(body, id);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Delete('/:id')
  async deleteCar(@Param() { id }: CarIdDto) {
    try {
      return await this.carService.deleteCar(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('/total/count')
  async totalNumberofCars() {
    try {
      const { count } = await this.carService.totalNumberofCars();
      return count;
    } catch (err) {
      throw new Error(err);
    }
  }
}
