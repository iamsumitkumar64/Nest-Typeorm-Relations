// Book Entity (Many Side - Owning Side)
// Many books can belong to one author. Holds the foreign key (authorId).

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from './author.entity';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // Direct foreign key column mapping (allows book.authorId = 12)
    @Column({ nullable: true })
    authorId: number;

    @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'authorId' })
    author: Author;
}
