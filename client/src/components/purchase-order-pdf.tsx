import { useEffect, useState } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { LineItem, PurchaseOrder } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from './ui/button';
import { FileDown } from 'lucide-react';

interface PurchaseOrderPdfProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseOrder?: PurchaseOrder;
}

export default function PurchaseOrderPdf({ 
  isOpen, 
  onClose, 
  purchaseOrder 
}: PurchaseOrderPdfProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && purchaseOrder) {
      generatePdf();
    } else {
      // Clean up the URL when dialog closes
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
    }
  }, [isOpen, purchaseOrder]);

  const generatePdf = () => {
    if (!purchaseOrder) return;

    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("PURCHASE ORDER", 105, 15, { align: "center" });
    
    // Add PO details
    doc.setFontSize(11);
    doc.text(`PO No: ${purchaseOrder.poNo}`, 14, 30);
    doc.text(`PO Date: ${formatDate(purchaseOrder.poDate)}`, 14, 37);
    doc.text(`PO Type: ${purchaseOrder.poType}`, 14, 44);
    
    doc.text(`Supplier: ${purchaseOrder.supplier}`, 140, 30);
    doc.text(`Currency: ${purchaseOrder.currency}`, 140, 37);
    doc.text(`Terms: ${purchaseOrder.terms}`, 140, 44);
    
    // Add expected delivery date
    doc.text(`Expected Delivery Date: ${formatDate(purchaseOrder.expectedDeliveryDate)}`, 14, 55);
    doc.text(`Contact Person: ${purchaseOrder.contactPerson}`, 140, 55);
    
    // Description section
    doc.setFontSize(10);
    doc.text("Terms Description:", 14, 65);
    doc.text(purchaseOrder.termsDescription, 14, 70, { 
      maxWidth: 180 
    });
    
    // Add line items header
    doc.setFontSize(12);
    doc.text("Item Details", 14, 90);
    
    // Create the items table
    const itemsTableData = purchaseOrder.items.map((item, index) => [
      index + 1, // Sl. No.
      item.item || "",
      item.quantity || 0,
      item.uom || "",
      item.rate || 0,
      item.discount || 0,
      item.finalRate || 0,
      item.tax || "",
      item.description || ""
    ]);
    
    // @ts-ignore - jspdf-autotable extension
    doc.autoTable({
      startY: 95,
      head: [['Sl No', 'Item', 'Quantity', 'UOM', 'Rate', 'Discount', 'Final Rate', 'Tax', 'Description']],
      body: itemsTableData,
      theme: 'grid',
      headStyles: { fillColor: [65, 105, 225], textColor: [255, 255, 255] },
      margin: { top: 95 }
    });
    
    // Get the y position after the table
    // @ts-ignore - jspdf-autotable extension
    const finalY = doc.previousAutoTable.finalY || 150;
    
    // Add totals
    doc.text(`Basic Total: ${purchaseOrder.basicTotal.toFixed(2)}`, 14, finalY + 10);
    doc.text(`Tax Total: ${purchaseOrder.taxTotal.toFixed(2)}`, 14, finalY + 20);
    doc.text(`Grand Total: ${purchaseOrder.grandTotal.toFixed(2)}`, 14, finalY + 30);
    
    // Convert the PDF to a Blob and create a URL
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };

  const handleDownload = () => {
    if (!pdfUrl || !purchaseOrder) return;
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `PO_${purchaseOrder.poNo}.pdf`;
    link.click();
  };

  // Helper function to format date
  const formatDate = (date: Date | string): string => {
    if (!date) return '';
    
    if (typeof date === 'string') {
      date = new Date(date);
    }
    
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Purchase Order Preview</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {pdfUrl ? (
            <div className="flex flex-col items-center">
              <div className="w-full h-[70vh] overflow-auto mb-4">
                <iframe 
                  src={pdfUrl} 
                  className="w-full h-full border border-gray-200 rounded-lg"
                  title="Purchase Order PDF Preview"
                />
              </div>
              <Button 
                onClick={handleDownload} 
                className="bg-primary text-white flex items-center"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">
              <p>Generating PDF preview...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}