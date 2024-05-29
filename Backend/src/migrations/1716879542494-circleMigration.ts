import { MigrationInterface, QueryRunner } from "typeorm";

export class CircleMigration1716879542494 implements MigrationInterface {
    name = 'CircleMigration1716879542494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "full_name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo_profile" character varying, "bio" character varying, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "threads" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "content" character varying, "number_of_replies" integer NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdById" integer, CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "replies" ("id" SERIAL NOT NULL, "userIdId" integer, "threadIdId" integer, CONSTRAINT "PK_08f619ebe431e27e9d206bea132" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "createdBy" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "updatedBy" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_7f6695f253ce017caee293da4f0" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_829fabbd5394610739e5bb6746f" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_24ad14188b37dcd8686bf0d3862" FOREIGN KEY ("threadIdId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_24ad14188b37dcd8686bf0d3862"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_829fabbd5394610739e5bb6746f"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_7f6695f253ce017caee293da4f0"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "createdBy"`);
        await queryRunner.query(`DROP TABLE "replies"`);
        await queryRunner.query(`DROP TABLE "threads"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
