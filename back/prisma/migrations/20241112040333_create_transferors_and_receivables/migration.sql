-- CreateTable
CREATE TABLE "transferors" (
    "id" TEXT NOT NULL,
    "document" VARCHAR(30) NOT NULL,
    "email" VARCHAR(140) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "name" VARCHAR(140) NOT NULL,

    CONSTRAINT "transferors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receivables" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL,
    "assignor_id" TEXT NOT NULL,

    CONSTRAINT "receivables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transferors_email_key" ON "transferors"("email");

-- AddForeignKey
ALTER TABLE "receivables" ADD CONSTRAINT "receivables_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "transferors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
