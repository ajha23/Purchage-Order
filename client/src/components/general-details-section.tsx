import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Search } from "lucide-react";
import { PurchaseOrderFormValues } from "@/lib/types";

interface GeneralDetailsSectionProps {
  form: UseFormReturn<PurchaseOrderFormValues>;
}

export default function GeneralDetailsSection({ form }: GeneralDetailsSectionProps) {
  const { control, setValue } = form;

  const [poDate, setPoDate] = useState<Date | undefined>(new Date());
  const [vendorRefDate, setVendorRefDate] = useState<Date | undefined>(undefined);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<Date | undefined>(undefined);

  // Update form values when dates change
  const handlePoDateChange = (date: Date | undefined) => {
    setPoDate(date);
    setValue('poDate', date);
  };

  const handleVendorRefDateChange = (date: Date | undefined) => {
    setVendorRefDate(date);
    setValue('vendorRefDate', date);
  };

  const handleExpectedDeliveryDateChange = (date: Date | undefined) => {
    setExpectedDeliveryDate(date);
    setValue('expectedDeliveryDate', date);
  };

  return (
    <div className="bg-white shadow rounded-md mb-6">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">General Details</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <Form {...form}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* PO Type */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="poType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">PO Type</FormLabel>
                    <div className="flex rounded-md">
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="bg-yellow-50 rounded-r-none">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="standard">Standard PO</SelectItem>
                              <SelectItem value="blanket">Blanket PO</SelectItem>
                              <SelectItem value="contract">Contract PO</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                      >
                        <Search className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* PO NO */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="poNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">PO NO</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* PO Date */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="poDate"
                render={() => (
                  <FormItem>
                    <FormLabel className="required">PO Date</FormLabel>
                    <FormControl>
                      <DatePicker 
                        date={poDate} 
                        setDate={handlePoDateChange} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Supplier */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Supplier</FormLabel>
                    <div className="flex rounded-md">
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="rounded-r-none">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="supplierA">Supplier A</SelectItem>
                              <SelectItem value="supplierB">Supplier B</SelectItem>
                              <SelectItem value="supplierC">Supplier C</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                      >
                        <Search className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Currency */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Currency</FormLabel>
                    <div className="flex rounded-md">
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="rounded-r-none">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="INR">INR : Rupees</SelectItem>
                              <SelectItem value="USD">USD : US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR : Euro</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                      >
                        <Search className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Exchange Rate */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="exchangeRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Exchange Rate</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value || ''} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Credit Period */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="creditPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Credit Period</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Terms */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Terms</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="net30">Net 30</SelectItem>
                            <SelectItem value="net60">Net 60</SelectItem>
                            <SelectItem value="net90">Net 90</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Terms Description */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="termsDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Terms Description</FormLabel>
                    <FormControl>
                      <Textarea rows={2} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Comments */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="additionalComments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Comments</FormLabel>
                    <FormControl>
                      <Textarea rows={2} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Vendor Ref No */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="vendorRefNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor Ref No</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Vendor Ref Date */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="vendorRefDate"
                render={() => (
                  <FormItem>
                    <FormLabel>Vendor Ref Date</FormLabel>
                    <FormControl>
                      <DatePicker 
                        date={vendorRefDate} 
                        setDate={handleVendorRefDateChange} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Expected Delivery Date */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="expectedDeliveryDate"
                render={() => (
                  <FormItem>
                    <FormLabel className="required">Expected Delivery Date</FormLabel>
                    <FormControl>
                      <DatePicker 
                        date={expectedDeliveryDate} 
                        setDate={handleExpectedDeliveryDateChange} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Person */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Contact Person</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="johnDoe">John Doe</SelectItem>
                            <SelectItem value="janeSmith">Jane Smith</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Bill To Location */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="billToLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill To Location</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="locationA">Location A</SelectItem>
                            <SelectItem value="locationB">Location B</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Ship To Location */}
            <div className="sm:col-span-2">
              <FormField
                control={control}
                name="shipToLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ship To Location</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="locationA">Location A</SelectItem>
                            <SelectItem value="locationB">Location B</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Bill To */}
            <div className="sm:col-span-3">
              <FormField
                control={control}
                name="billTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill To</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="plot11">Plot no.11-E, K.I.A.D.B Industrial Estate, Bashettihalli</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Ship To */}
            <div className="sm:col-span-3">
              <FormField
                control={control}
                name="shipTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ship To</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="plot11">Plot no.11-E, K.I.A.D.B Industrial Estate, Bashettihalli</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
