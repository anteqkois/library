import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookQueryDto } from './dto/book-query.dto';

@Injectable()
export class BooksService {
	constructor(
		@InjectRepository(Book)
		private booksRepository: Repository<Book>,
	) { }

	async create(createBookDto: CreateBookDto): Promise<Book> {
		const book = this.booksRepository.create(createBookDto);
		return this.booksRepository.save(book);
	}

	async findAll(query: BookQueryDto): Promise<Book[]> {
		const qb = this.booksRepository.createQueryBuilder('book');

		if (query.title) {
			qb.andWhere('book.title LIKE :title', { title: `%${query.title}%` });
		}
		if (query.author) {
			qb.andWhere('book.author LIKE :author', { author: `%${query.author}%` });
		}
		if (query.isbn) {
			qb.andWhere('book.isbn = :isbn', { isbn: query.isbn });
		}
		if (query.available) {
			qb.andWhere('book.amount > 0');
		}

		return qb.getMany();
	}

	async findOne(id: string): Promise<Book> {
		const book = await this.booksRepository.findOne({ where: { id } });
		if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
		return book;
	}

	async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
		const book = await this.findOne(id);
		Object.assign(book, updateBookDto);
		return this.booksRepository.save(book);
	}

	async remove(id: string): Promise<void> {
		const book = await this.findOne(id);
		await this.booksRepository.remove(book);
	}
}
