import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class CreateBookDto {
	@ApiProperty({ example: 'Clean Code' })
	@IsString()
	@IsNotEmpty()
	title!: string;

	@ApiProperty({ example: 'Robert C. Martin' })
	@IsString()
	@IsNotEmpty()
	author!: string;

	@ApiProperty({ example: '978-0132350884' })
	@IsString()
	@IsNotEmpty()
	isbn!: string;

	@ApiProperty({ example: 2008 })
	@IsInt()
	@Min(1000)
	publicationYear!: number;

	@ApiProperty({ example: 5, description: 'Number of copies available' })
	@IsInt()
	@Min(0)
	amount!: number;
}
