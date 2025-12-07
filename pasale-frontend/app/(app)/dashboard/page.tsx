import { RegionalTopProducts } from "@/components/dashboard/RegionalTopProducts";
import { RevenueByCategoryChart } from "@/components/charts/RevenueByCategoryChart";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { SalesHeatmapChart } from "@/components/charts/SalesHeatmapChart";
import { TOP_PRODUCTS, SLOW_MOVING_ITEMS } from "@/utils/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { DollarSign, Activity, Package, TrendingUp, TrendingDown } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            {/* Topbar removed - managed by layout */}

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-slate-700">Total Revenue</CardTitle>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                            <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">NPR 45,231.89</div>
                        <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" />+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="glass-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-slate-700">Total Transactions</CardTitle>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                            <Activity className="h-5 w-5 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">2,350</div>
                        <p className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" />+180.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="glass-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-slate-700">Active Products</CardTitle>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                            <Package className="h-5 w-5 text-purple-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">48</div>
                        <p className="text-xs text-purple-600 font-medium mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" />+19% from last month</p>
                    </CardContent>
                </Card>
                <Card className="glass-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-slate-700">Customer Sentiment</CardTitle>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 group-hover:from-orange-200 group-hover:to-amber-200 transition-all duration-300">
                            <TrendingUp className="h-5 w-5 text-orange-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Positive</div>
                        <p className="text-xs text-muted-foreground">+4% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* REPLACED: RevenueChart with RegionalTopProducts */}
                <div className="col-span-4 h-full">
                    <RegionalTopProducts />
                </div>

                {/* Revenue by Category */}
                <div className="col-span-3 h-full">
                    <Card className="glass-card h-full hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-slate-800">Revenue by Category</CardTitle>
                            <CardDescription className="text-slate-600">Distribution across product categories</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RevenueByCategoryChart />
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Best Selling Products Row */}
            <div className="grid gap-4 md:grid-cols-1">
                <Card className="glass-card hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-800">Best Selling Products</CardTitle>
                        <CardDescription className="text-slate-600">Top performing products by sales volume</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
                            {TOP_PRODUCTS.slice(0, 5).map((product, index) => (
                                <Link href={`/products/${product.id}`} key={product.id}>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 group cursor-pointer">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-800 truncate">{product.name}</p>
                                            <p className="text-xs text-slate-500">{product.sales.toLocaleString()} units</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Heatmap Row */}
            <div className="grid gap-4 md:grid-cols-1">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Sales Heatmap</CardTitle>
                        <CardDescription>Weekly sales performance overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SalesHeatmapChart />
                    </CardContent>
                </Card>
            </div>

            {/* Slow Moving Products - Single Card */}
            <div className="grid gap-4 md:grid-cols-1">
                <Card className="glass-card hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-800">Slow Moving Items</CardTitle>
                        <CardDescription className="text-slate-600">Products requiring attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {SLOW_MOVING_ITEMS.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 hover:border-red-200 hover:shadow-md transition-all duration-300">
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-800">{item.name}</p>
                                        <p className="text-xs text-slate-600 mt-1">{item.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 justify-end mb-1">
                                            <TrendingDown className="h-4 w-4 text-red-500" />
                                            <span className="text-sm font-bold text-red-600">{item.daysInStock} days</span>
                                        </div>
                                        <p className="text-xs text-slate-500">{item.stock} units in stock</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
