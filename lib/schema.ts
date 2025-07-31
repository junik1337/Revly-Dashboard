import {
  sqliteTable,
  text,
  integer,
  real,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// Chains Table
export const chains = sqliteTable("chains", {
  id: integer("chain_id").primaryKey(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

// Vendors Table
export const vendors = sqliteTable("vendors", {
  id: integer("vendor_id").primaryKey(),
  name: text("name").notNull(),
  longitude: real("longitude").notNull(),
  latitude: real("latitude").notNull(),
  chainId: integer("chain_id").references(() => chains.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

// Users Table
export const users = sqliteTable("users", {
  id: integer("user_id").primaryKey(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

// Users to Vendors Junction Table (Many-to-Many)
export const usersToVendors = sqliteTable(
  "users_vendors",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    vendorId: integer("vendor_id")
      .notNull()
      .references(() => vendors.id),
    displayName: text("display_name"),
    isEnabled: integer("is_enabled", { mode: "boolean" }).default(true),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
      () => new Date()
    ),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.vendorId] }),
  })
);

// Relations

export const chainsRelations = relations(chains, ({ many }) => ({
  vendors: many(vendors),
}));

export const vendorsRelations = relations(vendors, ({ one, many }) => ({
  chain: one(chains, {
    fields: [vendors.chainId],
    references: [chains.id],
  }),
  usersToVendors: many(usersToVendors),
}));

export const usersRelations = relations(users, ({ many }) => ({
  usersToVendors: many(usersToVendors),
}));

export const usersToVendorsRelations = relations(usersToVendors, ({ one }) => ({
  user: one(users, {
    fields: [usersToVendors.userId],
    references: [users.id],
  }),
  vendor: one(vendors, {
    fields: [usersToVendors.vendorId],
    references: [vendors.id],
  }),
}));
