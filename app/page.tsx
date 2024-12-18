import Image from "next/image";
import SalesBarChart from "./ui/dashboard/barchart";
import RevenueBarChart from "./ui/dashboard/barchart";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="w-full">
          <RevenueBarChart/>
        </div>
      </main>
    </div>
  );
}