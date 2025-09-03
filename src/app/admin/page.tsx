"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Allorder from "../admin/cms/orders/page";
import AddProductPage from "./cms/add-product/page";
import ProductListPage from "./cms/product-list/page";
import AddCoupon from "./cms/add-coupon/page";
import ViewCoupons from "./cms/view-coupons/page";
import BlogListPage from "./cms/blogs/page";
import CreateBlogPage from "./cms/blogs/create/page";
import TransactionPage from "./cms/transaction/page";
import TopCleaningBrands from "../components/TopCleaningBrands";
import OrdersList from "./cms/orders/orders-list/OrdersList";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  ArrowLeftRight,
  ChevronDown,
  LayoutDashboard,
  Package,
  Users,
  Tags,
  Bell,
  Menu,
  ChevronLeft,
  Ticket,
  LogOut,
  Search,
} from "lucide-react";

export default function AdminDashboard() {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [visitorsData, setVisitorsData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueRes, visitorsRes, productsRes] = await Promise.all([
          fetch("/api/admin/revenue"),
          fetch("/api/admin/visitors"),
          fetch("/api/admin/top-products"),
        ]);

        setRevenueData(await revenueRes.json());
        setVisitorsData(await visitorsRes.json());
        setTopProducts(await productsRes.json());
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  const toggleMenu = (menu: string) =>
    setOpenMenu(openMenu === menu ? null : menu);

  const totalRevenue = revenueData.reduce(
    (sum, item) => sum + (item.revenue || 0),
    0
  );
  const totalEarnings = revenueData.reduce(
    (sum, item) => sum + (item.earnings || 0),
    0
  );
  const totalVisitors = visitorsData.reduce(
    (sum, item) => sum + (item.visitors || 0),
    0
  );
  const topProductName = topProducts[0]?.name || "-";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white/90 backdrop-blur-md border-r shadow-md hidden md:flex flex-col transition-all duration-300
          ${collapsed ? "w-20" : "w-48"} fixed top-0 left-0 h-screen z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vacoom
            </h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-gray-100"
          >
            {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavLink
            onClick={() => setActiveTab("dashboard")}
            label="Dashboard"
            icon={<LayoutDashboard />}
            active={activeTab === "dashboard"}
            collapsed={collapsed}
          />
          <Dropdown
            label="Products"
            menu="products"
            openMenu={openMenu}
            toggleMenu={toggleMenu}
            items={[
              { label: "Add Product", value: "add-product" },
              { label: "Product List", value: "product-list" },
            ]}
            onSelect={(val: string) => setActiveTab(val)}
            collapsed={collapsed}
          />
          <Dropdown
            label="Orders"
            menu="orders"
            openMenu={openMenu}
            toggleMenu={toggleMenu}
            items={[
              { label: "Orders", value: "orders" },
              { label: "Orders List", value: "orders-list" },
            ]}
            onSelect={(val: string) => setActiveTab(val)}
            collapsed={collapsed}
          />
          <Dropdown
            label="Blogs"
            menu="blogs"
            openMenu={openMenu}
            toggleMenu={toggleMenu}
            items={[
              { label: "Add Blog", value: "admin/cms/blogs/create" },
              { label: "View Blogs", value: "blogs" },
            ]}
            onSelect={(val: string) => setActiveTab(val)}
            collapsed={collapsed}
          />
          <NavLink
            onClick={() => setActiveTab("transactions")}
            label="Transactions"
            icon={<ArrowLeftRight />}
            active={activeTab === "transactions"}
            collapsed={collapsed}
          />
          <Dropdown
            label="Coupons"
            icon={<Ticket />}
            menu="Coupons"
            openMenu={openMenu}
            toggleMenu={toggleMenu}
            items={[
              { label: "Add Coupon", value: "add-coupon" },
              { label: "View Coupons", value: "view-coupons" },
            ]}
            onSelect={(val: string) => setActiveTab(val)}
            collapsed={collapsed}
          />
          <NavLink
            onClick={() => setActiveTab("TopCleaningBrands")}
            label="Brands"
            icon={<Tags />}
            active={activeTab === "TopCleaningBrands"}
            collapsed={collapsed}
          />
          <NavLink
            onClick={() => setActiveTab("users")}
            label="Users"
            icon={<Users />}
            active={activeTab === "users"}
            collapsed={collapsed}
          />
          <NavLink
            onClick={() => setActiveTab("logout")}
            label="Logout"
            icon={<LogOut />}
            active={activeTab === "logout"}
            collapsed={collapsed}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-all duration-300 ${collapsed ? "ml-20" : "ml-48"}`}>
        {/* Header */}
        <header className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur-md rounded-xl shadow-sm px-4 py-3">
          <div>
            <p className="text-sm text-gray-400">Dashboard / {activeTab}</p>
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {activeTab}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
            </div>
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
            <img
              src="/user-avatar.png"
              alt="User"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Content */}
        {activeTab === "dashboard" && (
          <DashboardContent
            revenueData={revenueData}
            visitorsData={visitorsData}
            topProducts={topProducts}
            totalRevenue={totalRevenue}
            totalEarnings={totalEarnings}
            totalVisitors={totalVisitors}
            topProductName={topProductName}
          />
        )}
        {activeTab === "add-product" && <AddProductPage />}
        {activeTab === "product-list" && <ProductListPage />}
        {activeTab === "orders" && <Allorder />}
        {activeTab === "orders-list" && <OrdersList />}
        {activeTab === "admin/cms/blogs/create" && <CreateBlogPage />}
        {activeTab === "blogs" && <BlogListPage />}
        {activeTab === "transactions" && <TransactionPage />}
        {activeTab === "TopCleaningBrands" && <TopCleaningBrands />}
        {activeTab === "add-coupon" && <AddCoupon />}
        {activeTab === "view-coupons" && <ViewCoupons />}
        {activeTab === "users" && <TabContent title="Users" />}
      </main>
    </div>
  );
}

/* Tab Content Placeholder */
function TabContent({ title }: { title: string }) {
  return (
    <div className="text-center mt-20 text-xl font-semibold text-gray-700">
      {title} Page Content
    </div>
  );
}

/* NavLink */
function NavLink({ onClick, label, icon, active = false, collapsed }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all w-full text-left ${
        active
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow"
          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
      } ${collapsed ? "justify-center" : ""}`}
      title={collapsed ? label : ""}
    >
      {icon} {!collapsed && <span>{label}</span>}
    </button>
  );
}

/* Dropdown */
function Dropdown({
  label,
  menu,
  openMenu,
  toggleMenu,
  items,
  onSelect,
  collapsed,
  icon,
}: any) {
  const isOpen = openMenu === menu;
  return (
    <div>
      <button
        onClick={() => toggleMenu(menu)}
        className={`flex justify-between w-full px-3 py-2 rounded-xl transition-all ${
          isOpen
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow font-medium"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        } ${collapsed ? "justify-center" : ""}`}
        title={collapsed ? label : ""}
      >
        <span className="flex items-center gap-2">
          {icon || <Package className="w-4 h-4" />} {!collapsed && label}
        </span>
        {!collapsed && (
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {!collapsed && isOpen && (
        <div className="ml-6 mt-2 space-y-1 animate-fadeIn">
          {items.map((item: any) => (
            <button
              key={item.value}
              onClick={() => onSelect(item.value)}
              className="flex items-center gap-2 px-3 py-2 text-[15px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all w-full text-left"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Dashboard Content */
function DashboardContent({
  revenueData,
  visitorsData,
  topProducts,
  totalRevenue,
  totalEarnings,
  totalVisitors,
  topProductName,
}: any) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPI title="Revenue" value={`$${totalRevenue}`} color="from-blue-500 to-blue-600" />
        <KPI title="Earnings" value={`$${totalEarnings}`} color="from-green-500 to-green-600" />
        <KPI title="Visitors" value={`${totalVisitors}`} color="from-yellow-500 to-yellow-600" />
        <KPI title="Top Product" value={topProductName} color="from-purple-500 to-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Revenue & Earnings">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Visitors">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={visitorsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Top Products">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </>
  );
}

/* KPI Card */
function KPI({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100">
      <h3 className={`text-sm font-medium bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}>
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

/* Chart Card */
function ChartCard({ title, children }: any) {
  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-100 mb-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
