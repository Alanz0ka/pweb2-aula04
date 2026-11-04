import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTabelas1792717781167 implements MigrationInterface {
    name = 'CreateTabelas1792717781167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tarefas" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text, "concluida" boolean NOT NULL DEFAULT false, "projetoId" integer, CONSTRAINT "PK_2f57a4443470e61ac5de297e30a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projetos" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" text, "cor" character varying NOT NULL, CONSTRAINT "PK_fb6b6aed4b30e10b976fe8bdf5b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projetos"`);
        await queryRunner.query(`DROP TABLE "tarefas"`);
    }

}
