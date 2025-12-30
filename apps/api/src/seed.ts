import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { Admin } from './app/users/admin.entity';
import { Customer } from './app/users/customer.entity';
import { Book } from './app/books/book.entity';
import { Loan, LoanStatus } from './app/loans/loan.entity';

async function seed() {
	console.log('🌱 Starting Seeding Process...');

	const dataSource = new DataSource({
		type: 'sqlite',
		database: 'database.sqlite',
		entities: [Admin, Customer, Book, Loan],
		synchronize: true, // Auto-create tables if missing
	});

	await dataSource.initialize();

	const adminRepo = dataSource.getRepository(Admin);
	const customerRepo = dataSource.getRepository(Customer);
	const bookRepo = dataSource.getRepository(Book);
	const loanRepo = dataSource.getRepository(Loan);

	// 1. Admins
	console.log('Cleaning Admins...');
	await adminRepo.delete({}); // Optional: Clear existing
	const passwordHash = await bcrypt.hash('pass123', 10);

	const adminExists = await adminRepo.findOne({ where: { username: 'admin' } });
	if (!adminExists) {
		await adminRepo.save({
			email: 'admin@example.com',
			password: passwordHash,
			username: 'admin',
		});
		console.log('✅ Admin created: admin@example.com / pass123');
	} else {
		console.log('ℹ️  Admin already exists');
	}

	// 2. Customers
	console.log('Creating 10 Customers...');
	const customers: Customer[] = [];

	// Base customer
	const customerExists = await customerRepo.findOne({ where: { email: 'user@example.com' } });
	if (!customerExists) {
		const customer = customerRepo.create({
			email: 'user@example.com',
			password: passwordHash,
			name: 'John Doe',
			libraryCardNumber: 'CARD-12345',
			phoneNumber: '+123456789',
		});
		customers.push(await customerRepo.save(customer));
		console.log('✅ Customer created: user@example.com / pass123');
	} else {
		console.log('ℹ️ Customer already exists');
	}

	for (let i = 0; i < 10; i++) {
		const customer = customerRepo.create({
			email: faker.internet.email(),
			password: passwordHash,
			name: faker.person.fullName(),
			libraryCardNumber: faker.string.alphanumeric(8).toUpperCase(),
			phoneNumber: faker.phone.number(),
		});
		customers.push(await customerRepo.save(customer));
	}

	// 3. Books
	console.log('Creating 50 Books...');
	const books: Book[] = [];
	for (let i = 0; i < 50; i++) {
		const book = bookRepo.create({
			title: faker.book.title(),
			author: faker.book.author(),
			isbn: faker.commerce.isbn(),
			publicationYear: faker.date.past({ years: 50 }).getFullYear(),
			amount: faker.number.int({ min: 1, max: 10 }),
		});
		books.push(await bookRepo.save(book));
	}

	// 4. Loans
	console.log('Creating 50 Loans...');
	for (let i = 0; i < 50; i++) {
		const customer = faker.helpers.arrayElement(customers);
		const book = faker.helpers.arrayElement(books);
		const status = faker.helpers.enumValue(LoanStatus);

		const loan = loanRepo.create({
			customer,
			book,
			status,
			borrowedAt: faker.date.recent({ days: 30 }),
			returnedAt: status === LoanStatus.RETURNED ? faker.date.recent({ days: 5 }) : null,
		});
		await loanRepo.save(loan);
	}

	// And also loand for primary customer 
	console.log('Creating 20 Loans for main customer user@example.com / pass123...');
	const mainCustomer = customers[0]
	for (let i = 0; i < 20; i++) {
		const book = faker.helpers.arrayElement(books);
		const status = faker.helpers.enumValue(LoanStatus);

		const loan = loanRepo.create({
			customer: mainCustomer,
			book,
			status,
			borrowedAt: faker.date.recent({ days: 30 }),
			returnedAt: status === LoanStatus.RETURNED ? faker.date.recent({ days: 5 }) : null,
		});
		await loanRepo.save(loan);
	}

	await dataSource.destroy();
	console.log('🎉 Seeding Complete!');
}

seed().catch((err) => {
	console.error('❌ Seeding Failed:', err);
	process.exit(1);
});
