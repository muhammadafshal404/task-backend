import { Module } from '@nestjs/common';
import { CarService } from './service/car.service';
import { CarController } from './controller/car.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModel } from './models/car.model';

@Module({
  imports: [SequelizeModule.forFeature([CarModel])],
  providers: [CarService],
  controllers: [CarController],
  exports: [CarService],
})
export class CarModule {}
