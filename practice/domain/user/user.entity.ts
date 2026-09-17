import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { BookEntity } from "../book/book.entity";

@Entity('user')
export class UserEntity {
    @PrimaryColumn('uuid')
    uuid: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 30, nullable: false })
    email: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    password: string;

    @OneToMany(() => BookEntity, book => book.user)
    books: BookEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}