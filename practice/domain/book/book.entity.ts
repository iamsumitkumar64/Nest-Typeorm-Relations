import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity('book')
export class BookEntity {
    @PrimaryColumn('uuid')
    uuid: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    name: string;

    @Column({ type: "uuid", nullable: false })
    user_uuid: string;

    @ManyToOne(() => UserEntity, user => user.books)
    @JoinColumn({ name: "user_uuid" })
    user: UserEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}