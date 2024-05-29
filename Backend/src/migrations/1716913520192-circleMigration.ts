import { MigrationInterface, QueryRunner } from "typeorm";

export class CircleMigration1716913520192 implements MigrationInterface {
    name = 'CircleMigration1716913520192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL`);
    }

}
