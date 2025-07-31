import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "../db";

async function runMigrations() {
  console.log("Running migrations...");
  try {
    migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrations applied successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error running migrations:", error);
    process.exit(1);
  }
}

runMigrations();
