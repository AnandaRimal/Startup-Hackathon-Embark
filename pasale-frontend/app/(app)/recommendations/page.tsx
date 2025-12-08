"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TOP_PRODUCTS, getProductTopDistricts } from "@/utils/mockData";
import {
    MapPin, Target, Trophy,
    TrendingUp, ArrowUpRight, BarChart3,
    Sparkles, Zap, Globe, FileText, Download, Calendar
} from "lucide-react";

export default function RecommendationsPage() {
    // Get high-performing products by region
    const getRegionalOpportunities = () => {
        return TOP_PRODUCTS
            .filter(p => p.trend === "up" && p.sales > 2000)
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 4)
            .map(p => ({
                ...p,
                topRegions: getProductTopDistricts(p.id).slice(0, 3),
                marketPotential: p.sales > 5000 ? "Very High" : p.sales > 3000 ? "High" : "Medium"
            }));
    };

    // Product demand trends by category
    const getCategoryInsights = () => {
        const categoryData: Record<string, any> = {};
        TOP_PRODUCTS.forEach(p => {
            if (!categoryData[p.category]) {
                categoryData[p.category] = {
                    totalSales: 0,
                    avgPrice: 0,
                    count: 0,
                    trending: 0
                };
            }
            categoryData[p.category].totalSales += p.sales;
            categoryData[p.category].avgPrice += p.price;
            categoryData[p.category].count++;
            if (p.trend === "up") categoryData[p.category].trending++;
        });

        return Object.entries(categoryData)
            .map(([name, data]: [string, any]) => ({
                name,
                sales: data.totalSales,
                avgPrice: Math.round(data.avgPrice / data.count),
                products: data.count,
                trending: data.trending,
                marketStrength: data.trending / data.count > 0.5 ? "Strong" : data.trending / data.count > 0.2 ? "Growing" : "Stable"
            }))
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 4);
    };

    // Top growth opportunities
    const getTopOpportunities = () => {
        return TOP_PRODUCTS
            .filter(p => p.trend === "up")
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 3)
            .map(p => ({
                ...p,
                revenue: p.sales * p.price,
                growthRate: "+32%",
                dominance: "Market Leader"
            }));
    };

    const regionalOps = getRegionalOpportunities();
    const categoryInsights = getCategoryInsights();
    const topOpportunities = getTopOpportunities();

    const reports = [
        {
            title: "Monthly Performance Report",
            description: "Detailed analysis of sales, revenue trends, and top performing categories for the last 30 days.",
            date: "Generated: Dec 1, 2025",
            size: "2.4 MB",
            type: "PDF"
        },
        {
            title: "Q4 Sales Forecast",
            description: "AI-driven predictions for upcoming quarter demand and inventory requirements.",
            date: "Generated: Nov 28, 2025",
            size: "1.8 MB",
            type: "PDF"
        },
        {
            title: "Regional Market Strategy",
            description: "District-wise expansion opportunities and competitor analysis report.",
            date: "Generated: Dec 5, 2025",
            size: "3.1 MB",
            type: "PDF"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 p-8">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-xl shadow-indigo-200">
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                            Market Recommendations
                        </h1>
                        <p className="text-slate-500 text-lg mt-1 font-medium">Strategic insights for regional dominance</p>
                    </div>
                </div>
            </div>

            {/* Top Growth Highlight Section */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <h2 className="text-xl font-bold text-slate-800">Top Growth Opportunities</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topOpportunities.map((item, idx) => (
                        <Card key={item.id} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Zap className="h-24 w-24 text-indigo-600 rotate-12" />
                            </div>
                            <CardHeader className="relative pb-2">
                                <div className="flex justify-between items-start">
                                    <div className={`text-xs font-bold px-3 py-1 rounded-full ${idx === 0 ? "bg-yellow-100 text-yellow-800" : "bg-indigo-100 text-indigo-800"
                                        }`}>
                                        #{idx + 1} Ranked
                                    </div>
                                    <span className="text-green-600 font-bold flex items-center gap-1 text-sm bg-green-50 px-2 py-1 rounded-lg">
                                        <TrendingUp className="h-3 w-3" /> {item.growthRate}
                                    </span>
                                </div>
                                <CardTitle className="text-xl mt-3 text-slate-900">{item.name}</CardTitle>
                                <CardDescription className="font-medium text-slate-500">{item.category}</CardDescription>
                            </CardHeader>
                            <CardContent className="relative">
                                <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-slate-50 rounded-xl">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Revenue</p>
                                        <p className="text-lg font-bold text-slate-800">NPR {(item.revenue / 1000).toFixed(1)}k</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Status</p>
                                        <p className="text-lg font-bold text-indigo-600">{item.dominance}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mb-10">
                {/* Regional Opportunities - Takes up 2 columns */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <h2 className="text-xl font-bold text-slate-800">Regional Market Opportunities</h2>
                    </div>
                    {regionalOps.map((item) => (
                        <Card key={item.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                {item.category}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Globe className="h-4 w-4 text-slate-400" />
                                            <span>High demand detected in:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {item.topRegions.map((region: any, i: number) => (
                                                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200">
                                                    {region.district}
                                                    <span className="w-1 h-1 rounded-full bg-indigo-500 mx-1"></span>
                                                    <span className="text-indigo-600">{region.sales} units</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="min-w-[140px] p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 text-center">
                                        <p className="text-xs text-green-700 font-semibold uppercase mb-1">Market Potential</p>
                                        <p className="text-2xl font-bold text-green-700">{item.marketPotential}</p>
                                        <div className="mt-2 flex justify-center">
                                            <ArrowUpRight className="h-5 w-5 text-green-600" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Category Insights - Takes up 1 column */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-indigo-600" />
                        <h2 className="text-xl font-bold text-slate-800">Category Insights</h2>
                    </div>
                    <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0">
                            {categoryInsights.map((cat, idx) => (
                                <div key={idx} className={`p-5 ${idx !== categoryInsights.length - 1 ? "border-b border-indigo-100/50" : ""
                                    } hover:bg-slate-50 transition-colors`}>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-bold text-lg text-slate-900">{cat.name}</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full font-bold border ${cat.marketStrength === "Strong" ? "bg-green-50 text-green-700 border-green-200" :
                                            cat.marketStrength === "Growing" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                "bg-slate-100 text-slate-700 border-slate-200"
                                            }`}>
                                            {cat.marketStrength}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Volume</p>
                                            <p className="text-sm font-bold text-slate-700">{cat.sales.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Avg Price</p>
                                            <p className="text-sm font-bold text-slate-700">NPR {cat.avgPrice}</p>
                                        </div>
                                    </div>

                                    {cat.trending > 0 && (
                                        <div className="mt-3 pt-3 border-t border-indigo-50 flex items-center gap-2 text-xs text-indigo-600 font-medium">
                                            <TrendingUp className="h-3 w-3" />
                                            <span>{cat.trending} products trending up</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Business Reports Section */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-xl font-bold text-slate-800">Business Reports</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reports.map((report, idx) => (
                        <Card key={idx} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer hover:bg-indigo-50/50">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                        <FileText className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div className="text-xs font-medium px-2 py-1 bg-slate-100 rounded text-slate-600">
                                        {report.type} • {report.size}
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">
                                    {report.title}
                                </h3>
                                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                    {report.description}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                        <Calendar className="h-3 w-3" />
                                        {report.date}
                                    </div>
                                    <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                                        <Download className="h-3 w-3" />
                                        Download
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
