import { User } from './models';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './service/users.service';
import { NodeMailerService } from 'src/globalServices/nodemailer.service';
@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService, NodeMailerService],
  exports: [UsersService],
})
export class UsersModule {}
