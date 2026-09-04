import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserAndBook1700000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create users table
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'name', type: 'varchar', isNullable: false },
                ],
            }),
            true,
        );

        // Create books table with userId foreign key column
        await queryRunner.createTable(
            new Table({
                name: 'books',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'title', type: 'varchar', isNullable: false },
                    { name: 'userId', type: 'int', isNullable: true, isUnique: true },
                ],
            }),
            true,
        );

        // Add foreign key constraint for One-To-One relation
        await queryRunner.createForeignKey(
            'books',
            new TableForeignKey({
                name: 'FK_books_userId',
                columnNames: ['userId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('books', 'FK_books_userId');
        await queryRunner.dropTable('books');
        await queryRunner.dropTable('users');
    }
}
