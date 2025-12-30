import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Loan, LoanStatus } from './loan.entity';
import { Book } from '../books/book.entity';
import { Customer } from '../users/customer.entity';
import { Admin } from '../users/admin.entity';
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

	async borrow(user: { userId: string; role: string }, createLoanDto: CreateLoanDto): Promise<Loan> {
		return this.dataSource.transaction(async (manager) => {
			const book = await manager.findOne(Book, { where: { id: createLoanDto.bookId } });
			if (!book) throw new NotFoundException('Book not found');

			if (book.amount <= 0) {
				throw new ConflictException('Book is currently unavailable');
			}

			book.amount -= 1;
			await manager.save(book);

			const loan = new Loan();
			loan.book = book;
			loan.status = LoanStatus.BORROWED;
			loan.borrowedAt = new Date();

			if (user.role === 'admin') {
				const admin = await manager.findOne(Admin, { where: { id: user.userId } });
				if (!admin) throw new NotFoundException('Admin not found');
				loan.admin = admin;
			} else {
				const customer = await manager.findOne(Customer, { where: { id: user.userId } });
				if (!customer) throw new NotFoundException('Customer not found');
				loan.customer = customer;
			}

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

	// --- Admin Features ---

	async findAll(): Promise<Loan[]> {
		return this.loansRepository.find({
			order: { createdAt: 'DESC' },
			relations: ['book', 'customer', 'admin'],
		});
	}

	async getGlobalStats() {
		const total = await this.loansRepository.count();
		const active = await this.loansRepository.count({ where: { status: LoanStatus.BORROWED } });
		const returned = await this.loansRepository.count({ where: { status: LoanStatus.RETURNED } });

		return { total, active, returned };
	}

	async getUserStats() {
		// Group by customer
		const stats = await this.loansRepository
			.createQueryBuilder('loan')
			.leftJoinAndSelect('loan.customer', 'customer')
			.select('customer.email', 'email')
			.addSelect('COUNT(loan.id)', 'count')
			.groupBy('customer.id')
			.getRawMany();

		return stats;
	}

	async getBookStats() {
		// Group by book
		const stats = await this.loansRepository
			.createQueryBuilder('loan')
			.leftJoinAndSelect('loan.book', 'book')
			.select('book.title', 'title')
			.addSelect('COUNT(loan.id)', 'count')
			.groupBy('book.id')
			.getRawMany();

		return stats;
	}
}
