import { db } from "../db";
import { users, chains, vendors, usersToVendors } from "@/lib/schema";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import { ChainRow, UserRow, VendorRow } from "@/types";

async function seed() {
  console.log("Seeding database...");

  const readCsv = (fileName: string) => {
    const csvPath = path.join(process.cwd(), "Requirements", fileName);
    const fileContent = fs.readFileSync(csvPath, { encoding: "utf-8" });
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
  };

  try {
    // 1. Seed Chains
    const chainsData = readCsv("../Requirements/chains.csv") as ChainRow[];
    console.log("Seeding chains...");
    for (const row of chainsData) {
      await db
        .insert(chains)
        .values({
          id: parseInt(row.chain_id),
          name: row.chain_name,
        })
        .onConflictDoNothing();
    }

    // 2. Seed Vendors
    const vendorsData = readCsv("../Requirements/vendors.csv") as VendorRow[];
    console.log("Seeding vendors...");
    for (const row of vendorsData) {
      await db
        .insert(vendors)
        .values({
          id: parseInt(row.vendor_id),
          name: row.vendor_name,
          longitude: parseFloat(row.longitude),
          latitude: parseFloat(row.latitude),
          chainId: parseInt(row.chain_id),
        })
        .onConflictDoNothing();
    }

    // 3. Seed Users
    const usersData = readCsv("../Requirements/users.csv") as UserRow[];
    console.log("Seeding users...");
    for (const row of usersData) {
      await db
        .insert(users)
        .values({
          id: parseInt(row.user_id),
          displayName: row.display_name,
          email: row.email,
          isActive: row.is_active.toUpperCase() === "TRUE",
        })
        .onConflictDoNothing();
    }

    // 4. Seed User-Vendor relationships
    console.log("Seeding user-vendor relationships...");
    const allVendors = await db.select().from(vendors);
    for (const vendor of allVendors) {
      await db
        .insert(usersToVendors)
        .values({
          userId: 1,
          vendorId: vendor.id,
          displayName: vendor.name,
        })
        .onConflictDoNothing();
    }

    // Give user 2 access to vendors from "Tasty Burgers"
    const tastyBurgerChain = await db.query.chains.findFirst({
      where: (c, { eq }) => eq(c.name, "Tasty Burgers"),
    });
    if (tastyBurgerChain) {
      const tastyBurgerVendors = await db.query.vendors.findMany({
        where: (v, { eq }) => eq(v.chainId, tastyBurgerChain.id),
      });
      for (const vendor of tastyBurgerVendors) {
        await db
          .insert(usersToVendors)
          .values({
            userId: 2,
            vendorId: vendor.id,
            displayName: `Tash's ${vendor.name}`,
          })
          .onConflictDoNothing();
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
