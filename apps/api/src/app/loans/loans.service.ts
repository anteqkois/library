import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Loan, LoanStatus } from './loan.entity';
import { Book } from '../books/book.entity';
import { Customer } from '../users/customer.entity';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
	constructor(
		@InjectRepository(Loan)
		private loansRepository: Repository<Loan>,
		@InjectRepository(Book)
		private booksRepository: Repository<Book>,
		private dataSource: DataSource,
	) { }

	async borrow(customerId: string, createLoanDto: CreateLoanDto): Promise<Loan> {
		return this.dataSource.transaction(async (manager) => {
			const book = await manager.findOne(Book, { where: { id: createLoanDto.bookId } });
			if (!book) throw new NotFoundException('Book not found');

			if (book.amount <= 0) {
				throw new ConflictException('Book is currently unavailable');
			}

			// Check if user already has an active loan for this book? (Optional, skipping for MVP complexity)

			book.amount -= 1;
			await manager.save(book);

			// We need to fetch the customer entity proxy to link it
			const customer = await manager.findOne(Customer, { where: { id: customerId } });
			if (!customer) throw new NotFoundException('Customer not found');

			const loan = manager.create(Loan, {
				book,
				customer,
				status: LoanStatus.BORROWED,
				borrowedAt: new Date(),
			});

			return manager.save(loan);
		});
	}

	async returnBook(loanId: string, userId: string, isAdmin: boolean): Promise<Loan> {
		return this.dataSource.transaction(async (manager) => {
			const loan = await manager.findOne(Loan, {
				where: { id: loanId },
				relations: ['book', 'customer']
			});

			if (!loan) throw new NotFoundException('Loan not found');

			// Security Check: Only admin or the loan owner can return
			if (!isAdmin && loan.customer.id !== userId) {
				throw new BadRequestException('You cannot return this loan');
			}

			if (loan.status === LoanStatus.RETURNED) {
				throw new ConflictException('Loan is already returned');
			}

			loan.status = LoanStatus.RETURNED;
			loan.returnedAt = new Date();
			await manager.save(loan);

			loan.book.amount += 1;
			await manager.save(loan.book);

			return loan;
		});
	}

	async getMyLoans(customerId: string): Promise<Loan[]> {
		return this.loansRepository.find({
			where: { customer: { id: customerId } },
			order: { createdAt: 'DESC' },
			relations: ['book'],
		});
	}
}
