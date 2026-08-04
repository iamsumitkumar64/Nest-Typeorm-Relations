// Add the inverse side of the @ManyToMany relation
// without any @JoinTable decorator.

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(() => User, (user) => user.books)
    users: User[];
}
