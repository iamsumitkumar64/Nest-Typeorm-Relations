// Book Entity (Inverse Side)
// The Book entity maps back to the user property on the User entity.

import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToOne(() => User, (user) => user.book)
    user: User;
}
