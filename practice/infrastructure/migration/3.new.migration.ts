import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class NewMigration implements MigrationInterface {
    name: "NewMigration";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "book",
            new TableColumn({ name: "user_uuid", type: "uuid", isNullable: false }),
            new TableColumn({ name: "user_uuid", type: "uuid", isNullable: false, isUnique: true }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "book",
            new TableColumn({ name: "user_uuid", type: "uuid", isNullable: false, isUnique: true }),
            new TableColumn({ name: "user_uuid", type: "uuid", isNullable: false }),
        );
    }
}