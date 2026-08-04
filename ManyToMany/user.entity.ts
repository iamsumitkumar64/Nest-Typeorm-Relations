// Add the @ManyToMany decorator and
//  use @JoinTable on the owning side to create the middle join table.

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Book } from './book.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Book, (book) => book.users)
    @JoinTable({
        name: 'user_books', // name of the junction table
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'book_id', referencedColumnName: 'id' },
    })
    books: Book[];
}
