// User Entity (Owner Side)
// The User entity owns the relation and holds the foreign key (bookId).

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // Direct foreign key column mapping (allows user.bookId = 12)
    @Column({ nullable: true, unique: true })
    bookId: number;

    @OneToOne(() => Book, (book) => book.user, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'bookId' })
    book: Book;
}

