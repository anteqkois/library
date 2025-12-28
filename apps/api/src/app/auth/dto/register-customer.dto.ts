import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterCustomerDto {
	@ApiProperty({ example: 'user@example.com' })
	@IsEmail()
	email!: string;

	@ApiProperty({ example: 'pass123' })
	@IsNotEmpty()
	@MinLength(6)
	password!: string;

	@ApiProperty({ example: 'John Doe' })
	@IsString()
	@IsNotEmpty()
	name!: string;

	@ApiProperty({ example: 'CARD-12345' })
	@IsString()
	@IsNotEmpty()
	libraryCardNumber!: string;

	@ApiProperty({ example: '+123456789' })
	@IsString()
	@IsNotEmpty()
	phoneNumber!: string;
}
