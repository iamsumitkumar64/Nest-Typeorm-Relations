import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class BookMigration implements MigrationInterface {
    name: 'BookMigration';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "book",
            columns: [
                { name: "uuid", type: "uuid", isGenerated: false, isPrimary: true, default: "uuid_generate_v4()" },
                { name: "name", type: "varchar", length: "20", isNullable: false },
                { name: "user_uuid", type: "uuid", isNullable: false },
                { name: "created_at", type: "timestamp", default: "now()" },
                { name: "updated_at", type: "timestamp", default: "now()" },
                { name: "deleted_at", type: "timestamp", isNullable: true }
            ],
            foreignKeys: [
                {
                    name: "FK_BOOK_USER",
                    columnNames: ["user_uuid"],
                    referencedColumnNames: ["uuid"],
                    referencedTableName: "user"
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("book", "FK_BOOK_USER");
        await queryRunner.dropTable("book");
    }
}