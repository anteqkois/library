import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class BookQueryDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	title?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	author?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	isbn?: string;

	@ApiPropertyOptional({ description: 'Filter only available books (amount > 0)' })
	@IsOptional()
	@Transform(({ value }: TransformFnParams) => value === 'true' || value === true)
	@IsBoolean()
	available?: boolean;
}
