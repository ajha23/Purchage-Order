import { z } from "zod";

export interface LineItem {
  item: string;
  quantity: number;
  uom: string;
  rate: number;
  discount: number;
  finalRate: number;
  tax: string;
  description: string;
  moNo: string;
  manufacturer: string;
}

export const purchaseOrderFormSchema = z.object({
  poType: z.string().min(1, { message: "PO Type is required" }),
  poNo: z.string().min(1, { message: "PO No is required" }),
  poDate: z.date({ required_error: "PO Date is required" }),
  supplier: z.string().min(1, { message: "Supplier is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  exchangeRate: z.number().min(0.01, { message: "Exchange Rate must be greater than 0" }),
  creditPeriod: z.string(),
  terms: z.string().min(1, { message: "Terms is required" }),
  termsDescription: z.string().min(1, { message: "Terms Description is required" }),
  additionalComments: z.string().optional(),
  vendorRefNo: z.string().optional(),
  vendorRefDate: z.date().optional().nullable(),
  expectedDeliveryDate: z.date({ required_error: "Expected Delivery Date is required" }),
  contactPerson: z.string().min(1, { message: "Contact Person is required" }),
  billToLocation: z.string().optional(),
  shipToLocation: z.string().optional(),
  billTo: z.string().optional(),
  shipTo: z.string().optional(),
});

export type PurchaseOrderFormValues = z.infer<typeof purchaseOrderFormSchema>;

export interface PurchaseOrder extends PurchaseOrderFormValues {
  items: LineItem[];
  basicTotal: number;
  taxTotal: number;
  grandTotal: number;
}
