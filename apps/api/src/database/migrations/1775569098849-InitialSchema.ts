import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1775569098849 implements MigrationInterface {
    name = 'InitialSchema1775569098849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "Task_columnId_fkey"`);
        await queryRunner.query(`ALTER TABLE "Column" DROP CONSTRAINT "Column_workspaceId_fkey"`);
        await queryRunner.query(`ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_userId_fkey"`);
        await queryRunner.query(`DROP INDEX "public"."User_name_key"`);
        await queryRunner.query(`DROP INDEX "public"."User_email_key"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "PK_95d9364b8115119ba8b15a43592" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "columnId"`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "columnId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Column" DROP CONSTRAINT "Column_pkey"`);
        await queryRunner.query(`ALTER TABLE "Column" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Column" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Column" ADD CONSTRAINT "PK_df0aa166f1a3f0526fcbd77ca72" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Column" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "Column" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Column" DROP COLUMN "workspaceId"`);
        await queryRunner.query(`ALTER TABLE "Column" ADD "workspaceId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_pkey"`);
        await queryRunner.query(`ALTER TABLE "Workspace" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Workspace" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Workspace" ADD CONSTRAINT "PK_e731dd2fccf32e94db1edecbb2c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Workspace" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "Workspace" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Workspace" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "Workspace" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "User_pkey"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_99f220333df04d5f74f6db26c07" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_a25cc8a5dde30a5c517672f6f2b" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Column" ADD CONSTRAINT "FK_2d80961ca3e3877373f30c938c0" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Workspace" ADD CONSTRAINT "FK_cc38f747d8c4282b6965d9b32b0" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Workspace" DROP CONSTRAINT "FK_cc38f747d8c4282b6965d9b32b0"`);
        await queryRunner.query(`ALTER TABLE "Column" DROP CONSTRAINT "FK_2d80961ca3e3877373f30c938c0"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_a25cc8a5dde30a5c517672f6f2b"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "password" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "email" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_99f220333df04d5f74f6db26c07"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "PK_9862f679340fb2388436a5ab3e4"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Workspace" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "Workspace" ADD "userId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Workspace" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "Workspace" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Workspace" DROP CONSTRAINT "PK_e731dd2fccf32e94db1edecbb2c"`);
        await queryRunner.query(`ALTER TABLE "Workspace" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Workspace" ADD "id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Column" DROP COLUMN "workspaceId"`);
        await queryRunner.query(`ALTER TABLE "Column" ADD "workspaceId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Column" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "Column" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Column" DROP CONSTRAINT "PK_df0aa166f1a3f0526fcbd77ca72"`);
        await queryRunner.query(`ALTER TABLE "Column" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Column" ADD "id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Column" ADD CONSTRAINT "Column_pkey" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "columnId"`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "columnId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "PK_95d9364b8115119ba8b15a43592"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "User_email_key" ON "User" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "User_name_key" ON "User" ("name") `);
        await queryRunner.query(`ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Column" ADD CONSTRAINT "Column_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
