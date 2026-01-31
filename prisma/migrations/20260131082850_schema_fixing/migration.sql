/*
  Warnings:

  - You are about to drop the column `typeId` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Division` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `EmployeeStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classTypeId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Subdivision` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_typeId_fkey";

-- AlterTable
ALTER TABLE "Division" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userCreateId" TEXT,
ADD COLUMN     "userUpdateId" TEXT;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userCreateId" TEXT,
ADD COLUMN     "userUpdateId" TEXT;

-- AlterTable
ALTER TABLE "EmployeeStatus" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userCreateId" TEXT,
ADD COLUMN     "userUpdateId" TEXT;

-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "typeId",
ADD COLUMN     "classTypeId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userCreateId" TEXT,
ADD COLUMN     "userUpdateId" TEXT;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userCreateId" TEXT,
ADD COLUMN     "userUpdateId" TEXT;

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userCreateId" TEXT,
ADD COLUMN     "userUpdateId" TEXT;

-- AlterTable
ALTER TABLE "Subdivision" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userCreateId" TEXT,
ADD COLUMN     "userUpdateId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userCreateId" TEXT,
ADD COLUMN     "userUpdateId" TEXT;

-- DropTable
DROP TABLE "Type";

-- CreateTable
CREATE TABLE "ClassType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userCreateId" TEXT,
    "userUpdateId" TEXT,

    CONSTRAINT "ClassType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_classTypeId_fkey" FOREIGN KEY ("classTypeId") REFERENCES "ClassType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
