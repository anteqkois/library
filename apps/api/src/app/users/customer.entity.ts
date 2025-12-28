import { Entity, Column } from 'typeorm';
import { BaseUser } from './base-user.entity';

@Entity()
export class Customer extends BaseUser {
	@Column()
	name!: string;

	@Column({ unique: true })
	libraryCardNumber!: string;

	@Column()
	phoneNumber!: string;
}
