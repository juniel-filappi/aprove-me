-- CreateTable
CREATE TABLE "assignors" (
    "id" TEXT NOT NULL,
    "document" VARCHAR(30) NOT NULL,
    "email" VARCHAR(140) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "name" VARCHAR(140) NOT NULL,

    CONSTRAINT "assignors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payables" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL,
    "assignor_id" TEXT NOT NULL,

    CONSTRAINT "payables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assignors_email_key" ON "assignors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "assignors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
