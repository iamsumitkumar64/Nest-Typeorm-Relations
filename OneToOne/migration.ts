import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserAndBook1700000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create books table
        await queryRunner.createTable(
            new Table({
                name: 'books',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'title', type: 'varchar', isNullable: false },
                ],
            }),
            true,
        );

        // Create users table with bookId foreign key column
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'name', type: 'varchar', isNullable: false },
                    { name: 'bookId', type: 'int', isNullable: true },
                ],
            }),
            true,
        );

        // Add foreign key constraint for One-To-One relation
        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                columnNames: ['bookId'],
                referencedTableName: 'books',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'bookId');
        await queryRunner.dropTable('users');
        await queryRunner.dropTable('books');
    }
}
