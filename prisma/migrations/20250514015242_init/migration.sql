-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_family" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "hasDogs" BOOLEAN NOT NULL,
    "memberNames" TEXT,
    "membersCount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_family" ("hasDogs", "id", "memberNames", "membersCount", "name") SELECT "hasDogs", "id", "memberNames", "membersCount", "name" FROM "family";
DROP TABLE "family";
ALTER TABLE "new_family" RENAME TO "family";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
