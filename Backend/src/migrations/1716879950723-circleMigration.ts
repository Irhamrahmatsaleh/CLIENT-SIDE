import { MigrationInterface, QueryRunner } from "typeorm";

export class CircleMigration1716879950723 implements MigrationInterface {
    name = 'CircleMigration1716879950723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "full_name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo_profile" character varying, "bio" character varying, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "threads" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "content" character varying, "number_of_replies" integer NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdById" integer, CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "following" ("id" SERIAL NOT NULL, "userIdId" integer, "threadIdId" integer, CONSTRAINT "PK_c76c6e044bdf76ecf8bfb82a645" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "userIdId" integer, "threadIdId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_7f6695f253ce017caee293da4f0" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_ced43d6f7a7b4f2f46df02e1134" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_c6a0d4ed332c5cc3893267215e2" FOREIGN KEY ("threadIdId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_314680784cc4ba14bf392fbb873" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cc28874faae9823b38853f20823" FOREIGN KEY ("threadIdId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cc28874faae9823b38853f20823"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_314680784cc4ba14bf392fbb873"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_c6a0d4ed332c5cc3893267215e2"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_ced43d6f7a7b4f2f46df02e1134"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_7f6695f253ce017caee293da4f0"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "following"`);
        await queryRunner.query(`DROP TABLE "threads"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
