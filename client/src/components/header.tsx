import { HelpCircle, FileText } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <FileText className="text-primary mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">PURCHASE ORDER</h1>
          </div>
          <div className="text-sm text-gray-500">(Purchase -&gt; General PO)</div>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <HelpCircle className="text-primary h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
