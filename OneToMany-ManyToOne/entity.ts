// author.entity.ts
@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}


// book.entity.ts
@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Author, (author) => author.books)
    author: Author;
}
