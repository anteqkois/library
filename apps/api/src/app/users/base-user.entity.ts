import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseUser {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
