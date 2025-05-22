import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUomSchema, insertPurchaseOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // UOM API routes
  app.get('/api/uoms', async (req, res) => {
    try {
      const uoms = await storage.getUoms();
      res.json(uoms);
    } catch (error) {
      console.error("Error fetching UOMs:", error);
      res.status(500).json({ message: "Error fetching UOMs" });
    }
  });
  
  app.get('/api/uoms/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const uom = await storage.getUom(id);
      
      if (!uom) {
        return res.status(404).json({ message: "UOM not found" });
      }
      
      res.json(uom);
    } catch (error) {
      console.error("Error fetching UOM:", error);
      res.status(500).json({ message: "Error fetching UOM" });
    }
  });
  
  app.post('/api/uoms', async (req, res) => {
    try {
      const validatedData = insertUomSchema.parse(req.body);
      const newUom = await storage.createUom(validatedData);
      res.status(201).json(newUom);
    } catch (error) {
      console.error("Error creating UOM:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating UOM" });
    }
  });

  // Purchase Order API routes
  app.get('/api/purchase-orders', async (req, res) => {
    try {
      const orders = await storage.getPurchaseOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
      res.status(500).json({ message: "Error fetching purchase orders" });
    }
  });
  
  app.post('/api/purchase-orders', async (req, res) => {
    try {
      // Extract the purchase order data and line items from the request
      const { items, ...poData } = req.body;
      
      // Store the purchase order in the database
      const newPO = await storage.createPurchaseOrder(poData, items || []);
      
      res.status(201).json({ 
        message: "Purchase order created successfully",
        id: newPO.id,
        purchaseOrder: newPO
      });
    } catch (error) {
      console.error("Error creating purchase order:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating purchase order" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
