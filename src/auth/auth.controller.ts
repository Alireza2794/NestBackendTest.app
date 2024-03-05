import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UserModelResponse, UserModelBody } from 'src/users/models/user.model';
import { LoginModelBody, LoginModelResponse } from 'src/auth/model/auth.model';

@ApiTags('Authentication')
@Controller('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('Login')
  @ApiBody({ type: LoginModelBody })
  @ApiOkResponse({ type: LoginModelResponse })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('Register')
  @ApiBody({ type: UserModelBody })
  @ApiOkResponse({ type: UserModelResponse })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('Info')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserModelResponse })
  async Info(@Req() request: Request) {
    const user: any = request.user;

    if (user) {
      return this.authService.Info(user?.ClientId);
    }

    else {
      throw new HttpException('Your Token is expire', 400);
    }
  }

  // @Post('RessetPassword')
  // @UseGuards(JwtAuthGuard)
  // async RessetPassword(@Body() PhoneNumber: string) {

  // }
}
