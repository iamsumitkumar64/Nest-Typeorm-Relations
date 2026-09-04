// User Entity (Inverse Side)
// The User entity maps back to the book property on the Book entity.

import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Book } from './book.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Book, (book) => book.user)
    book: Book;
}

