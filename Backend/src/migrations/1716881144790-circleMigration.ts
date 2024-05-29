import { MigrationInterface, QueryRunner } from "typeorm";

export class CircleMigration1716881144790 implements MigrationInterface {
    name = 'CircleMigration1716881144790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_314680784cc4ba14bf392fbb873"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cc28874faae9823b38853f20823"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_7f6695f253ce017caee293da4f0"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_ced43d6f7a7b4f2f46df02e1134"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_c6a0d4ed332c5cc3893267215e2"`);
        await queryRunner.query(`CREATE TABLE "replies" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "thread_id" integer NOT NULL, "image" character varying NOT NULL, "content" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_by" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_by" character varying NOT NULL, CONSTRAINT "PK_08f619ebe431e27e9d206bea132" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "threadIdId"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "threadIdId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "thread_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "created_by" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "update_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "updated_by" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "update_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_by" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_by" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" ADD "thread_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "following" ADD "update_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "createdBy" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_dfee0c14f2a697eeb0b0bfc50cc" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_d8d74bcfa3ef439fa3742445e28" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_c961efa3687d100ed22cd409534" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_1af58ca9000874da2171004d164" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_4a5bd9db5bd73571f8c45717718" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_4fdfeb1ef6cdf3e0a6170a57b3b" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_4fdfeb1ef6cdf3e0a6170a57b3b"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_4a5bd9db5bd73571f8c45717718"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_1af58ca9000874da2171004d164"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_c961efa3687d100ed22cd409534"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_d8d74bcfa3ef439fa3742445e28"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_dfee0c14f2a697eeb0b0bfc50cc"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "createdBy" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "thread_id"`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "thread_id"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "following" ADD "threadIdId" integer`);
        await queryRunner.query(`ALTER TABLE "following" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedBy" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdBy" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "createdById" integer`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "threadIdId" integer`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "updatedBy" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "createdBy" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "replies"`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_c6a0d4ed332c5cc3893267215e2" FOREIGN KEY ("threadIdId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_ced43d6f7a7b4f2f46df02e1134" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_7f6695f253ce017caee293da4f0" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cc28874faae9823b38853f20823" FOREIGN KEY ("threadIdId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_314680784cc4ba14bf392fbb873" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
