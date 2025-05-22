import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FilePlus, FileText, Edit, Trash2 } from "lucide-react";

// UOM data type
interface UOM {
  id: number;
  code: string;
  name: string;
  description?: string;
  status?: 'active' | 'inactive';
  category?: string;
  lastUpdated?: string;
}

export default function UOMTable() {
  // Sample data for UOM table
  const [uomData, setUomData] = useState<UOM[]>([
    { id: 1, code: "K001", name: "KGS", description: "Kilograms", status: 'active', category: 'Weight', lastUpdated: '12-May-2025' },
    { id: 2, code: "L001", name: "LTR", description: "Liters", status: 'active', category: 'Volume', lastUpdated: '10-May-2025' },
    { id: 3, code: "M001", name: "MTR", description: "Meters", status: 'active', category: 'Length', lastUpdated: '05-May-2025' },
    { id: 4, code: "N001", name: "NOS", description: "Numbers", status: 'active', category: 'Quantity', lastUpdated: '12-May-2025' },
    { id: 5, code: "P002", name: "PAIR", description: "Pair of items", status: 'active', category: 'Quantity', lastUpdated: '15-May-2025' },
    { id: 6, code: "P001", name: "PKT", description: "Packet", status: 'active', category: 'Packaging', lastUpdated: '11-May-2025' },
    { id: 7, code: "B001", name: "BOX", description: "Box container", status: 'active', category: 'Packaging', lastUpdated: '09-May-2025' },
    { id: 8, code: "C001", name: "CTN", description: "Carton", status: 'active', category: 'Packaging', lastUpdated: '08-May-2025' },
    { id: 9, code: "D001", name: "DOZ", description: "Dozen", status: 'active', category: 'Quantity', lastUpdated: '07-May-2025' },
    { id: 10, code: "G001", name: "GMS", description: "Grams", status: 'active', category: 'Weight', lastUpdated: '06-May-2025' },
    { id: 11, code: "I001", name: "INCH", description: "Inches", status: 'inactive', category: 'Length', lastUpdated: '05-May-2025' },
    { id: 12, code: "R001", name: "ROLL", description: "Roll of material", status: 'active', category: 'Packaging', lastUpdated: '04-May-2025' },
    { id: 13, code: "S001", name: "SET", description: "Set of items", status: 'active', category: 'Quantity', lastUpdated: '03-May-2025' },
    { id: 14, code: "T001", name: "TON", description: "Metric ton", status: 'active', category: 'Weight', lastUpdated: '02-May-2025' },
    { id: 15, code: "U001", name: "UNIT", description: "Single unit", status: 'active', category: 'Quantity', lastUpdated: '01-May-2025' },
  ]);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sorting state
  const [sortField, setSortField] = useState<keyof UOM>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Handle sorting click
  const handleSort = (field: keyof UOM) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort data
  const filteredAndSortedData = [...uomData]
    .filter(uom => 
      uom.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (uom.description && uom.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (uom.category && uom.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Get sort indicator
  const getSortIndicator = (field: keyof UOM) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "▲" : "▼";
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <FileText className="text-primary mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">UOM</h1>
            </div>
            <div className="text-sm text-gray-500">(Masters -&gt; General -&gt; UOM)</div>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <Search className="text-primary h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="form-actions mb-4">
          <div className="form-actions-container justify-between">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <FilePlus className="h-4 w-4 mr-2" />
              Add New
            </Button>
            <div className="flex items-center">
              <span className="mr-2">Search:</span>
              <Input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
                placeholder="Search by code, name, or description..."
              />
              <div className="ml-4 flex space-x-2">
                <Button variant="outline" size="sm">
                  Excel
                </Button>
                <Button variant="outline" size="sm">
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="table-container">
            <table className="data-table">
              <thead className="data-table-header">
                <tr>
                  <th 
                    className="data-table-header-cell w-16 cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    Sl No {getSortIndicator("id")}
                  </th>
                  <th 
                    className="data-table-header-cell cursor-pointer"
                    onClick={() => handleSort("code")}
                  >
                    Code {getSortIndicator("code")}
                  </th>
                  <th 
                    className="data-table-header-cell cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name {getSortIndicator("name")}
                  </th>
                  <th 
                    className="data-table-header-cell cursor-pointer"
                    onClick={() => handleSort("description")}
                  >
                    Description {getSortIndicator("description")}
                  </th>
                  <th 
                    className="data-table-header-cell cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    Category {getSortIndicator("category")}
                  </th>
                  <th 
                    className="data-table-header-cell cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Status {getSortIndicator("status")}
                  </th>
                  <th 
                    className="data-table-header-cell cursor-pointer"
                    onClick={() => handleSort("lastUpdated")}
                  >
                    Last Updated {getSortIndicator("lastUpdated")}
                  </th>
                  <th className="data-table-header-cell w-20">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="data-table-body">
                {filteredAndSortedData.map((uom) => (
                  <tr key={uom.id} className="data-table-row">
                    <td className="data-table-cell text-center">{uom.id}</td>
                    <td className="data-table-cell font-medium">{uom.code}</td>
                    <td className="data-table-cell">{uom.name}</td>
                    <td className="data-table-cell">{uom.description}</td>
                    <td className="data-table-cell">{uom.category}</td>
                    <td className="data-table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        uom.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {uom.status}
                      </span>
                    </td>
                    <td className="data-table-cell">{uom.lastUpdated}</td>
                    <td className="data-table-cell">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}