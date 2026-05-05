CREATE TABLE "College" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "fee" INTEGER NOT NULL,
  "rating" DOUBLE PRECISION NOT NULL,
  "placementPercent" INTEGER NOT NULL,
  "averagePackageLpa" DOUBLE PRECISION NOT NULL,
  "highestPackageLpa" DOUBLE PRECISION NOT NULL,
  "courseTags" TEXT[],
  "exams" TEXT[],
  "minRank" INTEGER NOT NULL,
  "overview" TEXT NOT NULL,
  "established" INTEGER NOT NULL,
  "ownership" TEXT NOT NULL,
  "campusSizeAcres" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Course" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "duration" TEXT NOT NULL,
  "seats" INTEGER NOT NULL,
  "collegeId" TEXT NOT NULL,
  CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Review" (
  "id" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "rating" DOUBLE PRECISION NOT NULL,
  "comment" TEXT NOT NULL,
  "collegeId" TEXT NOT NULL,
  CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "College_slug_key" ON "College"("slug");

ALTER TABLE "Course"
  ADD CONSTRAINT "Course_collegeId_fkey"
  FOREIGN KEY ("collegeId") REFERENCES "College"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Review"
  ADD CONSTRAINT "Review_collegeId_fkey"
  FOREIGN KEY ("collegeId") REFERENCES "College"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
