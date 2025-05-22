import { 
  users, uom, purchaseOrders, lineItems,
  type User, type InsertUser,
  type Uom, type InsertUom,
  type PurchaseOrder, type InsertPurchaseOrder,
  type LineItem, type InsertLineItem
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // UOM methods
  getUoms(): Promise<Uom[]>;
  getUom(id: number): Promise<Uom | undefined>;
  getUomByCode(code: string): Promise<Uom | undefined>;
  createUom(uomData: InsertUom): Promise<Uom>;
  updateUom(id: number, uomData: Partial<InsertUom>): Promise<Uom | undefined>;
  deleteUom(id: number): Promise<boolean>;
  
  // Purchase Order methods
  getPurchaseOrders(): Promise<PurchaseOrder[]>;
  getPurchaseOrder(id: number): Promise<PurchaseOrder | undefined>;
  createPurchaseOrder(poData: InsertPurchaseOrder, items: InsertLineItem[]): Promise<PurchaseOrder>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // UOM methods
  async getUoms(): Promise<Uom[]> {
    return await db.select().from(uom);
  }
  
  async getUom(id: number): Promise<Uom | undefined> {
    const [uomItem] = await db.select().from(uom).where(eq(uom.id, id));
    return uomItem;
  }
  
  async getUomByCode(code: string): Promise<Uom | undefined> {
    const [uomItem] = await db.select().from(uom).where(eq(uom.code, code));
    return uomItem;
  }
  
  async createUom(uomData: InsertUom): Promise<Uom> {
    const [newUom] = await db
      .insert(uom)
      .values(uomData)
      .returning();
    return newUom;
  }
  
  async updateUom(id: number, uomData: Partial<InsertUom>): Promise<Uom | undefined> {
    const [updatedUom] = await db
      .update(uom)
      .set(uomData)
      .where(eq(uom.id, id))
      .returning();
    return updatedUom;
  }
  
  async deleteUom(id: number): Promise<boolean> {
    const result = await db
      .delete(uom)
      .where(eq(uom.id, id));
    return true;
  }
  
  // Purchase Order methods
  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    return await db.select().from(purchaseOrders);
  }
  
  async getPurchaseOrder(id: number): Promise<PurchaseOrder | undefined> {
    const [order] = await db.select().from(purchaseOrders).where(eq(purchaseOrders.id, id));
    return order;
  }
  
  async createPurchaseOrder(poData: InsertPurchaseOrder, items: InsertLineItem[]): Promise<PurchaseOrder> {
    const [newPO] = await db
      .insert(purchaseOrders)
      .values(poData)
      .returning();
    
    // Insert all line items
    if (items.length > 0) {
      for (const item of items) {
        await db.insert(lineItems).values({
          ...item,
          purchaseOrderId: newPO.id
        });
      }
    }
    
    return newPO;
  }
}

// Use the database storage implementation
export const storage = new DatabaseStorage();
