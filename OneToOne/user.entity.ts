// User Entity (Owner Side)
// The User entity owns the relation and holds the foreign key (bookId).

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Book } from '../book/book.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Book, (book) => book.user, { onDelete: 'CASCADE' })
    @JoinColumn()
    book: Book;
}
