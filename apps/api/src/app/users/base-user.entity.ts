import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseUser {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ unique: true, type: 'varchar' })
	email!: string;

	@Column({ type: 'varchar' })
	password!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
