/*
  Warnings:

  - You are about to drop the `Transaccions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaccions" DROP CONSTRAINT "Transaccions_productId_SizeId_fkey";

-- DropTable
DROP TABLE "Transaccions";

-- CreateTable
CREATE TABLE "Transactions" (
    "ID" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "SizeId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "Type" TEXT NOT NULL,
    "Cantidad" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_productId_SizeId_fkey" FOREIGN KEY ("productId", "SizeId") REFERENCES "Inventory"("productId", "SizeId") ON DELETE RESTRICT ON UPDATE CASCADE;