import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateFinalRate = (rate: number, discount: number): number => {
  if (!rate) return 0;
  const discountAmount = (rate * (discount || 0)) / 100;
  return rate - discountAmount;
};

export const calculateTaxAmount = (finalRate: number, tax: string): number => {
  if (!finalRate) return 0;
  
  switch (tax) {
    case 'gst5': return finalRate * 0.05;
    case 'gst12': return finalRate * 0.12;
    case 'gst18': return finalRate * 0.18;
    case 'gst28': return finalRate * 0.28;
    default: return 0;
  }
};

export const getTaxPercentage = (tax: string): number => {
  switch (tax) {
    case 'gst5': return 5;
    case 'gst12': return 12;
    case 'gst18': return 18;
    case 'gst28': return 28;
    default: return 0;
  }
};
