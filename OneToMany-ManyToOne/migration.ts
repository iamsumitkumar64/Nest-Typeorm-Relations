import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAuthorAndBookTables1234567890123 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Create Author Table
        await queryRunner.createTable(
            new Table({
                name: "author",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                ],
            }),
            true
        );

        // 2. Create Book Table (With the Foreign Key Column)
        await queryRunner.createTable(
            new Table({
                name: "book",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "authorId", // This stores the relation ID
                        type: "int",
                        isNullable: true, // Set to false if a book MUST have an author
                    },
                ],
            }),
            true
        );

        // 3. Create the One-To-Many / Many-To-One Foreign Key
        await queryRunner.createForeignKey(
            "book",
            new TableForeignKey({
                name: "FK_book_author",
                columnNames: ["authorId"],
                referencedColumnNames: ["id"],
                referencedTableName: "author",
                onDelete: "CASCADE", // Options: DEFAULT, SET NULL, RESTRICT, CASCADE
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Drop Foreign Key First
        await queryRunner.dropForeignKey("book", "FK_book_author");

        // 2. Drop Tables in Reverse Order
        await queryRunner.dropTable("book");
        await queryRunner.dropTable("author");
    }
}
