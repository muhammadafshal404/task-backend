import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos';
import { LocalAuthGuard } from '../local-auth.guard';
import { AuthService } from '../service/auth.service';

@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDTO) {
    try {
      return await this.authService.createUser(body);
    } catch (err) {
      throw new Error(err);
    }
  }
}
