-- CreateEnum
CREATE TYPE "Organisation" AS ENUM ('DEGEWO', 'HOWOGE', 'GESOBAU');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "organisation" "Organisation" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "imageLinks" TEXT[],
    "address" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "link" TEXT NOT NULL,
    "roomCount" INTEGER NOT NULL,
    "sqmeter" DOUBLE PRECISION NOT NULL,
    "wbs" BOOLEAN NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
