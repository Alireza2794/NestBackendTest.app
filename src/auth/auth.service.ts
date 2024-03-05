import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async register(registerDto: RegisterDto) {
    const User = await this.userService.findByPhoneNumber(registerDto.PhoneNumber);

    if (User) { throw new HttpException('User already exists', 400); }

    else {
      const result = await this.userService.create(registerDto);

      if (result) {
        const accessToken = this.jwtService.sign({
          sub: result.ClientId,
          phoneNumber: result.PhoneNumber
        });

        return { access_token: accessToken };
      }
    }

  }

  async login(loginDto: LoginDto) {
    const User = await this.userService.findByPhoneNumber(loginDto.PhoneNumber);

    if (!User) { throw new HttpException('User not found', 404); }

    else {
      const isPasswordMatch = await bcrypt.compare(
        loginDto.Password,
        User.Password
      );

      if (!isPasswordMatch) {
        throw new HttpException('Your Password is wrong!', 400);
      }

      else {
        const accessToken = this.jwtService.sign({
          sub: User.ClientId,
          phoneNumber: User.PhoneNumber
        });

        return { access_token: accessToken };
      }
    }
  }

}
