import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // UOM API routes
  app.get('/api/uoms', async (req, res) => {
    // Return mock data
    res.json([
      { id: 1, code: "K001", name: "KGS", description: "Kilograms", status: 'active', category: 'Weight', lastUpdated: '12-May-2025' },
      { id: 2, code: "L001", name: "LTR", description: "Liters", status: 'active', category: 'Volume', lastUpdated: '10-May-2025' },
      { id: 3, code: "M001", name: "MTR", description: "Meters", status: 'active', category: 'Length', lastUpdated: '05-May-2025' },
      { id: 4, code: "N001", name: "NOS", description: "Numbers", status: 'active', category: 'Quantity', lastUpdated: '12-May-2025' },
      { id: 5, code: "P002", name: "PAIR", description: "Pair of items", status: 'active', category: 'Quantity', lastUpdated: '15-May-2025' },
      { id: 6, code: "P001", name: "PKT", description: "Packet", status: 'active', category: 'Packaging', lastUpdated: '11-May-2025' },
    ]);
  });
  
  // Purchase Order API routes
  app.post('/api/purchase-orders', async (req, res) => {
    try {
      // Just return success without database operations
      res.status(201).json({ 
        message: "Purchase order created successfully",
        id: Date.now(), // Use timestamp as ID
        purchaseOrder: {
          ...req.body,
          id: Date.now()
        }
      });
    } catch (error) {
      console.error("Error processing purchase order:", error);
      res.status(500).json({ message: "Error processing purchase order" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
