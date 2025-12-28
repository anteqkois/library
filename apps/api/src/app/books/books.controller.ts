import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookQueryDto } from './dto/book-query.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) { }

	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@Post()
	@ApiOperation({ summary: 'Create a new book (Admin Only)' })
	create(@Body() createBookDto: CreateBookDto) {
		return this.booksService.create(createBookDto);
	}

	@Get()
	@ApiOperation({ summary: 'List all books (Public)' })
	findAll(@Query() query: BookQueryDto) {
		return this.booksService.findAll(query);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a book by ID (Public)' })
	findOne(@Param('id') id: string) {
		return this.booksService.findOne(id);
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@Patch(':id')
	@ApiOperation({ summary: 'Update a book (Admin Only)' })
	update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
		return this.booksService.update(id, updateBookDto);
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	@ApiOperation({ summary: 'Delete a book (Admin Only)' })
	remove(@Param('id') id: string) {
		return this.booksService.remove(id);
	}
}
