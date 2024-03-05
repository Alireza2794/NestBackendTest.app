import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/users/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmCodes } from './entities/codes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(ConfirmCodes)
    private readonly confirmCodes_Repository: Repository<ConfirmCodes>
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
        if (loginDto.Code) {
          // Check if code is exist in database and isValid
          const CheckCode = await this.confirmCodes_Repository.findOne({
            where: {
              Code: loginDto.Code,
              PhoneNumber: loginDto.PhoneNumber,
              IsUse: false
            }
          });

          if (CheckCode) {
            await this.confirmCodes_Repository.update(CheckCode, { IsUse: true });

            const accessToken = this.jwtService.sign({
              sub: User.ClientId,
              phoneNumber: User.PhoneNumber
            });

            return { access_token: accessToken };
          }

          else { throw new HttpException('Code is not valid!', 400); }
        }

        else {
          // Generate Uniqe Code and check in database
          const ConfirmCode = await this.generateOTPCode();

          // Save code in database
          await this.confirmCodes_Repository.save({
            PhoneNumber: loginDto.PhoneNumber,
            Code: ConfirmCode
          });

          // Send Code for User PhoneNumber
          return { Code: ConfirmCode }
        }
      }
    }
  }

  async Info(ClientId: string): Promise<UserModel> {
    return await this.userService.findOne(ClientId);
  }

  async generateOTPCode() {
    let code: number = null;

    while (!code) {
      const otp = this.getRandomCode();

      const checkCode = await this.confirmCodes_Repository.findOne({
        where: {
          Code: otp
        }
      });

      if (!checkCode) { code = otp }

      break;
    }

    return code;
  }

  getRandomCode() {
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;

    return otp;
  }
}
