// Book Entity (Many Side - Owning Side)
// Many books can belong to one user. Holds the foreign key (userId).

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // Direct foreign key column mapping (allows book.userId = 12)
    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User, (user) => user.books, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}
