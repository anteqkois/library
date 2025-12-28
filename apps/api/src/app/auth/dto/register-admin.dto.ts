import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterAdminDto {
	@ApiProperty({ example: 'admin@example.com' })
	@IsEmail()
	email!: string;

	@ApiProperty({ example: 'pass123' })
	@IsNotEmpty()
	@MinLength(6)
	password!: string;

	@ApiProperty({ example: 'admin_master' })
	@IsString()
	@IsNotEmpty()
	username!: string;
}
