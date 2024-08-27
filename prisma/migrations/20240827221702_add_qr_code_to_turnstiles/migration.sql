-- CreateTable
CREATE TABLE "turnstiles" (
    "id" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,

    CONSTRAINT "turnstiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "turnstiles_qrCode_key" ON "turnstiles"("qrCode");
