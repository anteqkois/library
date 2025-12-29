import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from '../users/customer.entity';
import { Book } from '../books/book.entity';

export enum LoanStatus {
	BORROWED = 'BORROWED',
	RETURNED = 'RETURNED',
}

@Entity()
export class Loan {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne(() => Customer, { eager: true })
	customer!: Customer;

	@ManyToOne(() => Book, { eager: true })
	book!: Book;

	@Column({ type: 'simple-enum', enum: LoanStatus, default: LoanStatus.BORROWED })
	status!: LoanStatus;

	@Column({ type: 'datetime' })
	borrowedAt!: Date;

	@Column({ nullable: true, type: 'datetime' })
	returnedAt?: Date;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
