import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserBookAndRelations1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create Users Table
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

    // 2. Create Books Table
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

    // 3. Create Junction Table (user_books)
    await queryRunner.createTable(
      new Table({
        name: 'user_books',
        columns: [
          { name: 'user_id', type: 'int', isPrimary: true },
          { name: 'book_id', type: 'int', isPrimary: true },
        ],
      }),
      true,
    );

    // 4. Add Foreign Keys for Junction Table
    await queryRunner.createForeignKey(
      'user_books',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_books',
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_books');
    await queryRunner.dropTable('books');
    await queryRunner.dropTable('users');
  }
}
