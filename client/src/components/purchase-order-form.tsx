import { Button } from "@/components/ui/button";
import GeneralDetailsSection from "./general-details-section";
import ItemDetailsSection from "./item-details-section";
import { usePurchaseOrder } from "@/hooks/use-purchase-order";
import { useToast } from "@/hooks/use-toast";

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
    handleSubmit 
  } = usePurchaseOrder();

  const { toast } = useToast();

  const onSubmit = () => {
    handleSubmit();
    toast({
      title: "Purchase Order Saved",
      description: "Your purchase order has been successfully saved.",
    });
  };

  return (
    <div>
      {/* Action Buttons and Totals */}
      <div className="bg-white shadow rounded-md mb-6">
        <div className="px-4 py-3 sm:px-6 flex items-center space-x-4 overflow-x-auto">
          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={onSubmit}
          >
            Save
          </Button>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Basic =</span>
            <span className="font-medium text-gray-900">{basicTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Tax =</span>
            <span className="font-medium text-gray-900">{taxTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Total =</span>
            <span className="font-medium text-gray-900">{total.toFixed(2)}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Grand Total</span>
            <span className="font-semibold text-lg text-primary-800">{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Form Sections */}
      <form>
        <GeneralDetailsSection form={form} />
        <ItemDetailsSection 
          items={items} 
          addItem={addItem} 
          removeItem={removeItem} 
          updateItem={updateItem} 
        />
      </form>
    </div>
  );
}
