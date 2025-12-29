import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { Loan } from './loan.entity';
import { Book } from '../books/book.entity';
import { Customer } from '../users/customer.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Loan, Book, Customer])],
	controllers: [LoansController],
	providers: [LoansService],
	exports: [LoansService],
})
export class LoansModule { }
