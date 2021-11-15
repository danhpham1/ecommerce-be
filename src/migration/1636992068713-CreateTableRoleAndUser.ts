import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableRoleAndUser1636992068713 implements MigrationInterface {
    name = 'CreateTableRoleAndUser1636992068713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`role_name\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`role_name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD UNIQUE INDEX \`IDX_4810bc474fe6394c6f58cb7c9e\` (\`role_name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP INDEX \`IDX_4810bc474fe6394c6f58cb7c9e\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`role_name\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`role_name\` varchar(255) NOT NULL`);
    }

}
