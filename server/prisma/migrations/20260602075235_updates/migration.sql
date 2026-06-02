/*
  Warnings:

  - You are about to drop the `user_profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user_profile";

-- CreateTable
CREATE TABLE "user_profiles" (
    "user_id" UUID NOT NULL,
    "goal" VARCHAR(20) NOT NULL,
    "experience" VARCHAR(20) NOT NULL,
    "days_per_week" INTEGER NOT NULL,
    "session_length" INTEGER NOT NULL,
    "equipment" VARCHAR(20) NOT NULL,
    "injuries" TEXT,
    "preferred_split" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("user_id")
);
