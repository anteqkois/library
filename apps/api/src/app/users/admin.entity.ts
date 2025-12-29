import { Entity, Column } from 'typeorm';
import { BaseUser } from './base-user.entity';

@Entity()
export class Admin extends BaseUser {
	@Column({ unique: true, type: 'varchar' })
	username!: string;
}
