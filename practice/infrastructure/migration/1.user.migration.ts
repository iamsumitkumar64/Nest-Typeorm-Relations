import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration implements MigrationInterface {
    name: 'UserMigration';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                { name: "uuid", type: "uuid", isGenerated: false, isPrimary: true, default: "uuid_generate_v4()" },
                { name: "name", type: "varchar", length: "20", isNullable: false },
                { name: "email", type: "varchar", length: "30", isNullable: false },
                { name: "password", type: "varchar", length: "20", isNullable: false },
                { name: "created_at", type: "timestamp", default: "now()" },
                { name: "updated_at", type: "timestamp", default: "now()" },
                { name: "deleted_at", type: "timestamp", isNullable: true }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }
}