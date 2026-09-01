import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAuthorAndBookTables1234567890123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Create Authors Table
        await queryRunner.createTable(
            new Table({
                name: 'authors',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        // 2. Create Books Table (With the Foreign Key Column)
        await queryRunner.createTable(
            new Table({
                name: 'books',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'authorId', // Foreign key column
                        type: 'int',
                        isNullable: true, // Set to false if a book MUST have an author
                    },
                ],
            }),
            true,
        );

        // 3. Create the One-To-Many / Many-To-One Foreign Key
        await queryRunner.createForeignKey(
            'books',
            new TableForeignKey({
                name: 'FK_books_authorId',
                columnNames: ['authorId'],
                referencedTableName: 'authors',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE', // Options: CASCADE, SET NULL, RESTRICT, NO ACTION
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Drop Foreign Key First
        await queryRunner.dropForeignKey('books', 'FK_books_authorId');

        // 2. Drop Tables in Reverse Order
        await queryRunner.dropTable('books');
        await queryRunner.dropTable('authors');
    }
}
