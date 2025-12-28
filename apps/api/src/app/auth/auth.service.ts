import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from '../users/customer.entity';
import { Admin } from '../users/admin.entity';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Customer)
		private customerRepository: Repository<Customer>,
		@InjectRepository(Admin)
		private adminRepository: Repository<Admin>,
		private jwtService: JwtService,
	) { }

	async registerCustomer(dto: RegisterCustomerDto): Promise<Customer> {
		const existing = await this.customerRepository.findOne({ where: { email: dto.email } });
		if (existing) throw new ConflictException('Email already in use');

		const hashedPassword = await bcrypt.hash(dto.password, 10);
		const customer = this.customerRepository.create({
			...dto,
			password: hashedPassword,
		});
		return this.customerRepository.save(customer);
	}

	async registerAdmin(dto: RegisterAdminDto): Promise<Admin> {
		const existing = await this.adminRepository.findOne({ where: { email: dto.email } });
		if (existing) throw new ConflictException('Email already in use');

		const hashedPassword = await bcrypt.hash(dto.password, 10);
		const admin = this.adminRepository.create({
			...dto,
			password: hashedPassword,
		});
		return this.adminRepository.save(admin);
	}

	async login(dto: LoginDto): Promise<{ accessToken: string }> {
		let user: Customer | Admin | null = await this.customerRepository.findOne({ where: { email: dto.email } });
		let role = 'customer';

		if (!user) {
			user = await this.adminRepository.findOne({ where: { email: dto.email } });
			role = 'admin';
		}

		if (!user || !(await bcrypt.compare(dto.password, user.password))) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const payload = { sub: user.id, email: user.email, role };
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
