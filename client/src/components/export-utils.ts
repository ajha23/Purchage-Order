import { utils, writeFile } from 'xlsx';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

// Excel export function
export function exportToExcel<T>(data: T[], filename: string) {
  // Create a new workbook and worksheet
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  
  // Add the worksheet to the workbook
  utils.book_append_sheet(workbook, worksheet, 'Data');
  
  // Generate the Excel file and trigger download
  writeFile(workbook, `${filename}.xlsx`);
}

// PDF export function for UOM table
export function exportUomTableToPdf(
  data: any[], 
  columns: string[], 
  filename: string
) {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text("UOM Table", 105, 15, { align: "center" });
  
  // Format the data for the table
  const tableData = data.map(item => {
    return columns.map(col => item[col] || '');
  });
  
  // Column headers for PDF
  const headers = columns.map(col => {
    // Convert camelCase to Title Case with spaces
    return col.replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  });
  
  // Create the table
  // @ts-ignore - jspdf-autotable extension
  doc.autoTable({
    startY: 25,
    head: [headers],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [65, 105, 225], textColor: [255, 255, 255] },
    margin: { top: 25 }
  });
  
  // Save the PDF and trigger download
  doc.save(`${filename}.pdf`);
}