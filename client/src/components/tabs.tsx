import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PurchaseOrderForm from "./purchase-order-form";
import UOMTable from "./uom-table";

export default function AppTabs() {
  const [activeTab, setActiveTab] = useState("purchase-order");

  return (
    <Tabs 
      defaultValue="purchase-order" 
      className="w-full"
      onValueChange={setActiveTab}
    >
      <div className="bg-white shadow mb-4">
        <div className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="purchase-order" className="py-3">
              Purchase Order
            </TabsTrigger>
            <TabsTrigger value="uom" className="py-3">
              UOM Table
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      
      <TabsContent value="purchase-order" className="mt-0">
        <PurchaseOrderForm />
      </TabsContent>
      
      <TabsContent value="uom" className="mt-0">
        <UOMTable />
      </TabsContent>
    </Tabs>
  );
}