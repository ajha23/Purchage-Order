import { pgTable, text, serial, integer, boolean, numeric, date, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// UOM (Unit of Measure) table
export const statusEnum = pgEnum('status', ['active', 'inactive']);

export const uom = pgTable("uom", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  name: varchar("name", { length: 50 }).notNull(),
  description: text("description"),
  status: statusEnum("status").default('active'),
  category: varchar("category", { length: 50 }),
  lastUpdated: date("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUomSchema = createInsertSchema(uom).pick({
  code: true,
  name: true,
  description: true,
  status: true,
  category: true,
});

export type InsertUom = z.infer<typeof insertUomSchema>;
export type Uom = typeof uom.$inferSelect;

// Purchase Order table
export const purchaseOrders = pgTable("purchase_orders", {
  id: serial("id").primaryKey(),
  poType: varchar("po_type", { length: 50 }).notNull(),
  poNo: varchar("po_no", { length: 50 }).notNull().unique(),
  poDate: date("po_date").notNull(),
  supplier: varchar("supplier", { length: 100 }).notNull(),
  currency: varchar("currency", { length: 20 }).notNull(),
  exchangeRate: numeric("exchange_rate").notNull(),
  creditPeriod: varchar("credit_period", { length: 50 }),
  terms: varchar("terms", { length: 50 }).notNull(),
  termsDescription: text("terms_description").notNull(),
  additionalComments: text("additional_comments"),
  vendorRefNo: varchar("vendor_ref_no", { length: 50 }),
  vendorRefDate: date("vendor_ref_date"),
  expectedDeliveryDate: date("expected_delivery_date").notNull(),
  contactPerson: varchar("contact_person", { length: 100 }).notNull(),
  billToLocation: varchar("bill_to_location", { length: 100 }),
  shipToLocation: varchar("ship_to_location", { length: 100 }),
  billTo: text("bill_to"),
  shipTo: text("ship_to"),
  basicTotal: numeric("basic_total").notNull(),
  taxTotal: numeric("tax_total").notNull(),
  grandTotal: numeric("grand_total").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPurchaseOrderSchema = createInsertSchema(purchaseOrders).omit({
  id: true,
  createdAt: true
});

export type InsertPurchaseOrder = z.infer<typeof insertPurchaseOrderSchema>;
export type PurchaseOrder = typeof purchaseOrders.$inferSelect;

// Line Items table
export const lineItems = pgTable("line_items", {
  id: serial("id").primaryKey(),
  purchaseOrderId: integer("purchase_order_id").notNull().references(() => purchaseOrders.id, { onDelete: 'cascade' }),
  item: varchar("item", { length: 100 }).notNull(),
  quantity: numeric("quantity").notNull(),
  uom: varchar("uom", { length: 20 }),
  rate: numeric("rate").notNull(),
  discount: numeric("discount"),
  finalRate: numeric("final_rate").notNull(),
  tax: varchar("tax", { length: 20 }),
  description: text("description"),
  moNo: varchar("mo_no", { length: 50 }),
  manufacturer: varchar("manufacturer", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLineItemSchema = createInsertSchema(lineItems).omit({
  id: true,
  createdAt: true
});

export type InsertLineItem = z.infer<typeof insertLineItemSchema>;
export type LineItem = typeof lineItems.$inferSelect;
