import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import configuration from 'config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeOptions } from 'sequelize-typescript';
import { UsersModule } from './modules/user/users.module';
import { CategoryModule } from './modules/category/category.module';
import { CarModule } from './modules/car/car.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    SequelizeModule.forRoot(
      configuration().database as unknown as SequelizeOptions,
    ),
    CategoryModule,
    CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
