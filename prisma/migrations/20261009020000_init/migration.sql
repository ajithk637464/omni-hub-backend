-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Alien" (
    "AlienId" SERIAL NOT NULL,
    "AlienGuid" TEXT NOT NULL,
    "AlienName" TEXT NOT NULL,
    "Species" TEXT,
    "HomePlanet" TEXT,
    "Description" TEXT,
    "EnergyConsumption" INTEGER NOT NULL DEFAULT 0,
    "Strength" INTEGER NOT NULL DEFAULT 0,
    "Speed" INTEGER NOT NULL DEFAULT 0,
    "Intelligence" INTEGER NOT NULL DEFAULT 0,
    "Accuracy" INTEGER NOT NULL DEFAULT 0,
    "AlienLevel" INTEGER NOT NULL DEFAULT 1,
    "Unlocked" BOOLEAN NOT NULL DEFAULT false,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "SortOrder" INTEGER NOT NULL DEFAULT 0,
    "Created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedUserGuid" TEXT,
    "CreatedUserGroupGuid" TEXT,
    "Updated" TIMESTAMP(3) NOT NULL,
    "UpdatedUserGuid" TEXT,
    "UpdatedUserGroupGuid" TEXT,

    CONSTRAINT "Alien_pkey" PRIMARY KEY ("AlienId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alien_AlienGuid_key" ON "Alien"("AlienGuid");

-- CreateTable
CREATE TABLE "AlienPower" (
    "AlienPowerId" SERIAL NOT NULL,
    "AlienPowerGuid" TEXT NOT NULL,
    "AlienPowerName" TEXT NOT NULL,
    "Description" TEXT,
    "PowerType" TEXT NOT NULL,
    "PowerLevel" INTEGER NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "SortOrder" INTEGER NOT NULL DEFAULT 0,
    "Created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedUserGuid" TEXT,
    "CreatedUserGroupGuid" TEXT,
    "Updated" TIMESTAMP(3) NOT NULL,
    "UpdatedUserGuid" TEXT,
    "UpdatedUserGroupGuid" TEXT,

    CONSTRAINT "AlienPower_pkey" PRIMARY KEY ("AlienPowerId")
);

-- CreateTable
CREATE TABLE "AlienAlienPower" (
    "AlienId" INTEGER NOT NULL,
    "AlienPowerId" INTEGER NOT NULL,
    "IsMainPower" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AlienAlienPower_pkey" PRIMARY KEY ("AlienId", "AlienPowerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlienPower_AlienPowerGuid_key" ON "AlienPower"("AlienPowerGuid");

-- AddForeignKey
ALTER TABLE "AlienAlienPower" ADD CONSTRAINT "AlienAlienPower_AlienId_fkey" FOREIGN KEY ("AlienId") REFERENCES "Alien"("AlienId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlienAlienPower" ADD CONSTRAINT "AlienAlienPower_AlienPowerId_fkey" FOREIGN KEY ("AlienPowerId") REFERENCES "AlienPower"("AlienPowerId") ON DELETE RESTRICT ON UPDATE CASCADE;
