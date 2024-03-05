import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Authentication')
@Controller('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('Login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('Register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
