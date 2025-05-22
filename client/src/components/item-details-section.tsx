import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Trash2 } from "lucide-react";
import { LineItem } from "@/lib/types";

interface ItemDetailsSectionProps {
  items: LineItem[];
  addItem: () => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, field: keyof LineItem, value: any) => void;
  showErrors?: boolean;
}

export default function ItemDetailsSection({
  items,
  addItem,
  removeItem,
  updateItem,
}: ItemDetailsSectionProps) {
  return (
    <div className="bg-white shadow rounded-md">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Item Details</h3>
      </div>
      <div className="px-4 py-5 sm:p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-12">
                Sl No
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider required">
                Item
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                UOM
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider required">
                Rate
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Disc
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Final Rate
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider required">
                Tax
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                MO No
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Manufacturer
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex rounded-md shadow-sm">
                    <Select 
                      value={item.item || ''} 
                      onValueChange={(value) => updateItem(index, 'item', value)}
                    >
                      <SelectTrigger className="rounded-r-none">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="item1">Item 1</SelectItem>
                          <SelectItem value="item2">Item 2</SelectItem>
                          <SelectItem value="item3">Item 3</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Input
                    type="number"
                    className="max-w-[80px]"
                    value={item.quantity || ''}
                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Input
                    type="text"
                    className="max-w-[80px]"
                    value={item.uom || ''}
                    onChange={(e) => updateItem(index, 'uom', e.target.value)}
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Input
                    type="number"
                    className="max-w-[80px]"
                    value={item.rate || ''}
                    onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value))}
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Input
                    type="number"
                    className="max-w-[80px]"
                    value={item.discount || ''}
                    onChange={(e) => updateItem(index, 'discount', parseFloat(e.target.value))}
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Input
                    type="number"
                    className="max-w-[80px] bg-gray-100"
                    value={item.finalRate || ''}
                    readOnly
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Select 
                    value={item.tax || ''} 
                    onValueChange={(value) => updateItem(index, 'tax', value)}
                  >
                    <SelectTrigger className="max-w-[120px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="gst5">GST 5%</SelectItem>
                        <SelectItem value="gst12">GST 12%</SelectItem>
                        <SelectItem value="gst18">GST 18%</SelectItem>
                        <SelectItem value="gst28">GST 28%</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Input
                    type="text"
                    className="max-w-[120px]"
                    value={item.description || ''}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex rounded-md shadow-sm">
                    <Select 
                      value={item.moNo || ''} 
                      onValueChange={(value) => updateItem(index, 'moNo', value)}
                    >
                      <SelectTrigger className="max-w-[120px] rounded-r-none">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="mo001">MO001</SelectItem>
                          <SelectItem value="mo002">MO002</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Select 
                    value={item.manufacturer || ''} 
                    onValueChange={(value) => updateItem(index, 'manufacturer', value)}
                  >
                    <SelectTrigger className="max-w-[120px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="manufacturerA">Manufacturer A</SelectItem>
                        <SelectItem value="manufacturerB">Manufacturer B</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                  {index === items.length - 1 ? (
                    <Button 
                      type="button" 
                      variant="default" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-green-600 hover:bg-green-700"
                      onClick={addItem}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
