import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConfirmCodes } from 'src/auth/entities/codes.entity';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
    }),
    TypeOrmModule.forFeature([User, ConfirmCodes]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule { }
