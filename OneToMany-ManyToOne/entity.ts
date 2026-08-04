import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

// author.entity.ts
@Entity('authors')
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}

// book.entity.ts
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
