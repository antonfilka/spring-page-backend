-- DropIndex
DROP INDEX "token_un";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "refreshToken" SET DATA TYPE VARCHAR;
