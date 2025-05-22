import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  PurchaseOrderFormValues, 
  purchaseOrderFormSchema, 
  LineItem,
  PurchaseOrder
} from "@/lib/types";
import { calculateFinalRate, calculateTaxAmount } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";

export function usePurchaseOrder() {
  // Setup form with default values
  const form = useForm<PurchaseOrderFormValues>({
    resolver: zodResolver(purchaseOrderFormSchema),
    defaultValues: {
      poType: "",
      poNo: "EXA2526/PO/23",
      poDate: new Date(),
      supplier: "",
      currency: "INR",
      exchangeRate: 1,
      creditPeriod: "",
      terms: "",
      termsDescription: "",
      additionalComments: "",
      vendorRefNo: "",
      vendorRefDate: null,
      expectedDeliveryDate: undefined,
      contactPerson: "",
      billToLocation: "",
      shipToLocation: "",
      billTo: "plot11",
      shipTo: "plot11",
    },
  });

  // Form errors
  const formErrors = form.formState.errors;

  // Line items state
  const [items, setItems] = useState<LineItem[]>([
    {
      item: "",
      quantity: 0,
      uom: "",
      rate: 0,
      discount: 0,
      finalRate: 0,
      tax: "",
      description: "",
      moNo: "",
      manufacturer: "",
    },
  ]);

  // Totals state
  const [basicTotal, setBasicTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Add item handler
  const addItem = () => {
    setItems([
      ...items,
      {
        item: "",
        quantity: 0,
        uom: "",
        rate: 0,
        discount: 0,
        finalRate: 0,
        tax: "",
        description: "",
        moNo: "",
        manufacturer: "",
      },
    ]);
  };

  // Remove item handler
  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // Update item handler
  const updateItem = (index: number, field: keyof LineItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // Calculate final rate when rate or discount changes
    if (field === 'rate' || field === 'discount') {
      const rate = field === 'rate' ? value : newItems[index].rate;
      const discount = field === 'discount' ? value : newItems[index].discount;
      newItems[index].finalRate = calculateFinalRate(rate, discount);
    }

    setItems(newItems);
  };

  // Calculate totals whenever items change
  useEffect(() => {
    let newBasicTotal = 0;
    let newTaxTotal = 0;

    items.forEach((item) => {
      if (item.quantity && item.finalRate) {
        const itemTotal = item.quantity * item.finalRate;
        newBasicTotal += itemTotal;
        newTaxTotal += calculateTaxAmount(itemTotal, item.tax);
      }
    });

    const newTotal = newBasicTotal + newTaxTotal;

    setBasicTotal(newBasicTotal);
    setTaxTotal(newTaxTotal);
    setTotal(newTotal);
    setGrandTotal(newTotal);
  }, [items]);

  // Form submission handler
  const handleSubmit = async () => {
    form.handleSubmit(async (data) => {
      try {
        const purchaseOrder: PurchaseOrder = {
          ...data,
          items,
          basicTotal,
          taxTotal,
          grandTotal,
        };

        await apiRequest("POST", "/api/purchase-orders", purchaseOrder);
        // We would typically do something with the response here
      } catch (error) {
        console.error("Error submitting purchase order:", error);
      }
    })();
  };

  return {
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
    formErrors,
  };
}
