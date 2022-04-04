-- CreateTable
CREATE TABLE "springProjects" (
    "projectId" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "text" VARCHAR NOT NULL,
    "img" VARCHAR NOT NULL,

    CONSTRAINT "newtable_pk" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "hashPassword" VARCHAR NOT NULL,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "age" INTEGER NOT NULL,
    "refreshToken" VARCHAR NOT NULL,

    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_un" ON "users"("username");
