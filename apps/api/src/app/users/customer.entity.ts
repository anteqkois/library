import { Entity, Column } from 'typeorm';
import { BaseUser } from './base-user.entity';

@Entity()
export class Customer extends BaseUser {
	@Column({ type: 'varchar' })
	name!: string;

	@Column({ unique: true, type: 'varchar' })
	libraryCardNumber!: string;

	@Column({ type: 'varchar' })
	phoneNumber!: string;
}
