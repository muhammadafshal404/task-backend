import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../user/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/constant';
import { AuthController } from './controller/auth.controller';
import { NodeMailerService } from 'src/globalServices/nodemailer.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1y',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, NodeMailerService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
