/*
  Warnings:

  - Added the required column `ownerId` to the `gyms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gymId` to the `turnstiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_ins" ADD COLUMN     "turnstileId" TEXT;

-- AlterTable
ALTER TABLE "gyms" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "turnstiles" ADD COLUMN     "gymId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'MEMBER';

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_turnstileId_fkey" FOREIGN KEY ("turnstileId") REFERENCES "turnstiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gyms" ADD CONSTRAINT "gyms_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turnstiles" ADD CONSTRAINT "turnstiles_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
