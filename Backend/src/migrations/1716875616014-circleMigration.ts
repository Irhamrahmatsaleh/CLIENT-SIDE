import { MigrationInterface, QueryRunner } from "typeorm";

export class CircleMigration1716875616014 implements MigrationInterface {
    name = 'CircleMigration1716875616014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo_profile" character varying NOT NULL, "bio" character varying NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
