import Image from "next/image";
import SalesBarChart from "./ui/dashboard/barchart";
export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="mr-2">📊</span>
                Overview
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="mr-2">📈</span>
                Analytics
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="mr-2">⚙️</span>
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Total Users</h2>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Revenue</h2>
            <p className="text-3xl font-bold">$45,678</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Active Projects</h2>
            <p className="text-3xl font-bold">23</p>
          </div>
        </div>
        <div className="mt-8 w-full">
          <SalesBarChart />
        </div>
      </main>
    </div>
  );
}
