// Book Entity (Owner Side)
// The Book entity owns the relation and holds the foreign key (userId).

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // Direct foreign key column mapping (allows book.userId = 12)
    @Column({ nullable: true, unique: true })
    userId: number;

    @OneToOne(() => User, (user) => user.book, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}
