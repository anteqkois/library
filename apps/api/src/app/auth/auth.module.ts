import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomersController } from './customers.controller';
import { AdminsController } from './admins.controller';
import { JwtStrategy } from './jwt.strategy';
import { Customer } from '../users/customer.entity';
import { Admin } from '../users/admin.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Customer, Admin]),
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'dev_secret_key',
			signOptions: { expiresIn: '1h' },
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController, CustomersController, AdminsController],
	exports: [AuthService],
})
export class AuthModule { }
