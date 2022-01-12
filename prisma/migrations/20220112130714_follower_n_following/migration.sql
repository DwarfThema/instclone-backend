-- CreateTable
CREATE TABLE "_FollowRelataion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowRelataion_AB_unique" ON "_FollowRelataion"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowRelataion_B_index" ON "_FollowRelataion"("B");

-- AddForeignKey
ALTER TABLE "_FollowRelataion" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowRelataion" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
