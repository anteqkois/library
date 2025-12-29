import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Book {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar' })
	title!: string;

	@Column({ type: 'varchar' })
	author!: string;

	@Column({ type: 'varchar' })
	isbn!: string;

	@Column({ type: 'int' })
	publicationYear!: number;

	@Column({ default: 0, type: 'int' })
	amount!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
