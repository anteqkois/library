import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Book {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	title!: string;

	@Column()
	author!: string;

	@Column()
	isbn!: string;

	@Column()
	publicationYear!: number;

	@Column({ default: 0 })
	amount!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
