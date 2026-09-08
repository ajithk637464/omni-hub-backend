-- CreateTable
CREATE TABLE "Alien" (
    "alienId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "isUnlocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alien_pkey" PRIMARY KEY ("alienId")
);
