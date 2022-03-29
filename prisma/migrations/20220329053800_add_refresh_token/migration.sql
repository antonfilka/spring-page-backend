-- AlterTable
ALTER TABLE "users" ALTER COLUMN "refreshToken" DROP NOT NULL,
ALTER COLUMN "refreshToken" SET DATA TYPE TEXT;
