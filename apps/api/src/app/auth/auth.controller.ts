import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@Post('register/customer')
	@ApiOperation({ summary: 'Register a new Customer' })
	registerCustomer(@Body() dto: RegisterCustomerDto) {
		return this.authService.registerCustomer(dto);
	}

	@Post('register/admin')
	@ApiOperation({ summary: 'Register a new Admin' })
	registerAdmin(@Body() dto: RegisterAdminDto) {
		return this.authService.registerAdmin(dto);
	}

	@Post('login')
	@ApiOperation({ summary: 'Login to get JWT token' })
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}
}
