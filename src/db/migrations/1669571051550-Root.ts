import { MigrationInterface, QueryRunner } from "typeorm";

export class Root1669571051550 implements MigrationInterface {
    name = "Root1669571051550"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "value" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_98082dbb08817c9801e32dd0155" UNIQUE ("value"), CONSTRAINT "PK_16fc336b9576146aa1f03fdc7c5" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "token" character varying NOT NULL, "userUuid" uuid, CONSTRAINT "UQ_e9f62f5dcb8a54b84234c9e7a06" UNIQUE ("token"), CONSTRAINT "PK_faf29798ea59ac7f07b1be6f79b" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "roleUuid" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "tag" character varying NOT NULL, "authorUuid" uuid, CONSTRAINT "UQ_db66121dc39534bfc85341711d1" UNIQUE ("tag"), CONSTRAINT "PK_46eb0c89341869ba6c882edab36" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "title" character varying NOT NULL, "rating" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL, "authorUuid" uuid, CONSTRAINT "PK_64caa00822d29e30eba1f273db5" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "answers" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "rating" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL, "authorUuid" uuid, "questionUuid" uuid, CONSTRAINT "PK_1d877529a28df7adf8f71771523" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "questions_tags_tags" ("questionsUuid" uuid NOT NULL, "tagsUuid" uuid NOT NULL, CONSTRAINT "PK_188358ef7eacaaaba0225345ea9" PRIMARY KEY ("questionsUuid", "tagsUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c0202180b3c62891e3465bd29" ON "questions_tags_tags" ("questionsUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_a15bd31d0b7e0e37a27f06b792" ON "questions_tags_tags" ("tagsUuid") `);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_0cf32594de4b9ed2edabe69c076" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b39d66a4614c9ce63dba591b093" FOREIGN KEY ("roleUuid") REFERENCES "role"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_cc6a3faff2a9aff2fac522ba30d" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_64f3997c160282b1492305dc25f" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_68b00d34ab00dc81fc3719f00d2" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_311d041874939847daf3b1dc346" FOREIGN KEY ("questionUuid") REFERENCES "questions"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" ADD CONSTRAINT "FK_3c0202180b3c62891e3465bd292" FOREIGN KEY ("questionsUuid") REFERENCES "questions"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" ADD CONSTRAINT "FK_a15bd31d0b7e0e37a27f06b7923" FOREIGN KEY ("tagsUuid") REFERENCES "tags"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" DROP CONSTRAINT "FK_a15bd31d0b7e0e37a27f06b7923"`);
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" DROP CONSTRAINT "FK_3c0202180b3c62891e3465bd292"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_311d041874939847daf3b1dc346"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_68b00d34ab00dc81fc3719f00d2"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_64f3997c160282b1492305dc25f"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_cc6a3faff2a9aff2fac522ba30d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b39d66a4614c9ce63dba591b093"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_0cf32594de4b9ed2edabe69c076"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a15bd31d0b7e0e37a27f06b792"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c0202180b3c62891e3465bd29"`);
        await queryRunner.query(`DROP TABLE "questions_tags_tags"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
