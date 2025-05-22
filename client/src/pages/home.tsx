import Header from "@/components/header";
import PurchaseOrderForm from "@/components/purchase-order-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PurchaseOrderForm />
      </main>
    </div>
  );
}
