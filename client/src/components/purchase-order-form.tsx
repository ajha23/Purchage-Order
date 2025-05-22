import { Button } from "@/components/ui/button";
import GeneralDetailsSection from "./general-details-section";
import ItemDetailsSection from "./item-details-section";
import { usePurchaseOrder } from "@/hooks/use-purchase-order";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LineItem } from "@/lib/types";

export default function PurchaseOrderForm() {
  const { 
    form, 
    items, 
    addItem, 
    removeItem, 
    updateItem, 
    basicTotal, 
    taxTotal, 
    total, 
    grandTotal, 
    handleSubmit,
    formErrors
  } = usePurchaseOrder();

  const { toast } = useToast();
  const [showErrors, setShowErrors] = useState(false);

  // Create a new item to be added on save
  const [newItem, setNewItem] = useState<LineItem>({
    item: "",
    quantity: 0,
    uom: "",
    rate: 0,
    discount: 0,
    finalRate: 0,
    tax: "",
    description: "",
    moNo: "",
    manufacturer: ""
  });

  const onSubmit = () => {
    setShowErrors(true);
    
    // First check if the form is valid
    if (Object.keys(formErrors).length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before saving.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if there's at least one valid item
    if (items.length === 0 || !items.some(item => item.item && item.rate)) {
      toast({
        title: "No Items Added",
        description: "Please add at least one item to your purchase order.",
        variant: "destructive"
      });
      return;
    }
    
    // If all validations pass, submit the form
    handleSubmit();
    
    toast({
      title: "Purchase Order Saved",
      description: "Your purchase order has been successfully saved.",
    });

    // Reset new item
    setNewItem({
      item: "",
      quantity: 0,
      uom: "",
      rate: 0,
      discount: 0,
      finalRate: 0,
      tax: "",
      description: "",
      moNo: "",
      manufacturer: ""
    });
    
    // Reset errors display
    setShowErrors(false);
  };

  return (
    <div>
      {/* Action Buttons and Totals */}
      <div className="form-actions">
        <div className="form-actions-container">
          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={onSubmit}
          >
            Save
          </Button>
          <div className="form-total-display">
            <span className="form-total-label">Basic =</span>
            <span className="form-total-value">{basicTotal.toFixed(2)}</span>
          </div>
          <div className="form-total-display">
            <span className="form-total-label">Tax =</span>
            <span className="form-total-value">{taxTotal.toFixed(2)}</span>
          </div>
          <div className="form-total-display">
            <span className="form-total-label">Total =</span>
            <span className="form-total-value">{total.toFixed(2)}</span>
          </div>
          <div className="form-total-display">
            <span className="form-total-label">Grand Total</span>
            <span className="form-grand-total-value">{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Form Sections */}
      <form onSubmit={(e) => e.preventDefault()}>
        <GeneralDetailsSection form={form} showErrors={showErrors} />
        <ItemDetailsSection 
          items={items} 
          addItem={addItem} 
          removeItem={removeItem} 
          updateItem={updateItem}
          showErrors={showErrors}
        />
      </form>
    </div>
  );
}
