/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Site` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "photo" DROP NOT NULL,
ALTER COLUMN "subscriptionId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Site_slug_key" ON "Site"("slug");

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
