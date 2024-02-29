import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { RegisterUserDto } from 'src/dto/registerUser.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    async login(@Body(ValidationPipe) LoginUserDto: LoginUserDto) {
        return this.authService.loginUser(LoginUserDto);
    }

    @Post('register')
    register(@Body(ValidationPipe) RegisterUserDto: RegisterUserDto) {
        return this.authService.createUser(RegisterUserDto);
    }

    @Get('data')
    async getUsers() {
        return this.authService.getUser();
    }
}
