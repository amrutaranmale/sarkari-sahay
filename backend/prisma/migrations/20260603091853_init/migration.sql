-- CreateTable
CREATE TABLE "Scheme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameHi" TEXT,
    "slug" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "state" TEXT,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "summaryHi" TEXT,
    "benefitAmount" TEXT,
    "benefitType" TEXT,
    "applicationUrl" TEXT NOT NULL,
    "ministry" TEXT,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "minIncome" INTEGER,
    "maxIncome" INTEGER,
    "castes" JSONB NOT NULL,
    "genders" JSONB NOT NULL,
    "occupations" JSONB NOT NULL,
    "disabilityRequired" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scheme_slug_key" ON "Scheme"("slug");

-- CreateIndex
CREATE INDEX "Scheme_level_idx" ON "Scheme"("level");

-- CreateIndex
CREATE INDEX "Scheme_state_idx" ON "Scheme"("state");

-- CreateIndex
CREATE INDEX "Scheme_category_idx" ON "Scheme"("category");

-- CreateIndex
CREATE INDEX "Scheme_isActive_idx" ON "Scheme"("isActive");
