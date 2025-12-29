import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateLoanDto {
	@ApiProperty({ example: 'uuid-of-book', description: 'ID of the book to borrow' })
	@IsUUID()
	@IsNotEmpty()
	bookId!: string;
}
