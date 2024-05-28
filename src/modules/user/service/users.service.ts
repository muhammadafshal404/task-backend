import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { NodeMailerService } from 'src/globalServices/nodemailer.service';
import { MESSAGES } from 'src/utils/constant';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize,
    private readonly nodeMailerService: NodeMailerService,
  ) {}

  async create(CreateUserDTO): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        email: CreateUserDTO?.email,
      },
    });
    if (!user) {
      return await this.userModel.create(CreateUserDTO);
    } else {
      throw new Error(MESSAGES.USER_ALREADY_EXIST);
    }
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(email: string) {
    return this.userModel.findOne({
      where: {
        email: email,
      },
    });
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}
