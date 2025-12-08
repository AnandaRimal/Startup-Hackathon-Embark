"use client"
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TOP_PRODUCTS } from "@/utils/mockData";
import { TrendingUp, DollarSign, Package, Calendar, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";
import { ForecastChart } from "@/components/charts/ForecastChart";
import { MonthlyForecastChart } from "@/components/charts/MonthlyForecastChart";

export default function AIForecastingPage() {
    // Generate forecast data for all products
    const generateRevenueForecast = () => {
        return TOP_PRODUCTS.map(product => {
            const currentRevenue = product.sales * product.price;
            const growthRate = product.trend === "up" ? 0.15 : product.trend === "down" ? -0.08 : 0.03;
            const forecastRevenue = Math.round(currentRevenue * (1 + growthRate));

            return {
                ...product,
                currentRevenue,
                forecastRevenue,
                growthRate,
                trend: forecastRevenue > currentRevenue ? "up" : forecastRevenue < currentRevenue ? "down" : "stable"
            };
        }).sort((a, b) => b.forecastRevenue - a.forecastRevenue).slice(0, 10);
    };

    const generateDemandForecast = () => {
        return TOP_PRODUCTS.map(product => {
            const forecastMultiplier = product.trend === "up" ? 1.2 : product.trend === "down" ? 0.85 : 1.05;
            const forecastDemand = Math.round(product.sales * forecastMultiplier);
            const demandChange = forecastDemand - product.sales;

            return {
                ...product,
                currentDemand: product.sales,
                forecastDemand,
                demandChange,
                changePercent: Math.round((demandChange / product.sales) * 100)
            };
        }).sort((a, b) => b.forecastDemand - a.forecastDemand).slice(0, 10);
    };

    const revenueForecast = generateRevenueForecast();
    const demandForecast = generateDemandForecast();

    // Calculate overall stats FIRST
    const totalCurrentRevenue = revenueForecast.reduce((sum, p) => sum + p.currentRevenue, 0);
    const totalForecastRevenue = revenueForecast.reduce((sum, p) => sum + p.forecastRevenue, 0);
    const totalCurrentDemand = demandForecast.reduce((sum, p) => sum + p.currentDemand, 0);
    const totalForecastDemand = demandForecast.reduce((sum, p) => sum + p.forecastDemand, 0);

    // Generate monthly forecast data (uses totals calculated above)
    const generateMonthlyRevenueForecast = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map((month, index) => {
            const baseRevenue = totalCurrentRevenue / 12;
            const seasonalFactor = 1 + Math.sin((index / 12) * Math.PI * 2) * 0.15;
            const growthFactor = 1 + (index / 12) * 0.08;
            return {
                month,
                current: Math.round(baseRevenue * seasonalFactor),
                forecast: Math.round(baseRevenue * seasonalFactor * growthFactor)
            };
        });
    };

    const generateMonthlyDemandForecast = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map((month, index) => {
            const baseDemand = totalCurrentDemand / 12;
            const seasonalFactor = 1 + Math.sin((index / 12) * Math.PI * 2) * 0.12;
            const growthFactor = 1 + (index / 12) * 0.06;
            return {
                month,
                current: Math.round(baseDemand * seasonalFactor),
                forecast: Math.round(baseDemand * seasonalFactor * growthFactor)
            };
        });
    };

    const monthlyRevenueData = generateMonthlyRevenueForecast();
    const monthlyDemandData = generateMonthlyDemandForecast();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-8">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg shadow-green-500/30">
                        <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-green-900 to-teal-900 bg-clip-text text-transparent">
                            AI Forecasting
                        </h1>
                        <p className="text-slate-600 text-sm mt-1">Revenue and demand predictions for all products</p>
                    </div>
                </div>
            </div>


            {/* Monthly Forecast Line Graphs */}
            <div className="max-w-7xl mx-auto mb-8 grid gap-6 md:grid-cols-2">
                {/* Revenue Forecast */}
                <Card className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            Monthly Revenue Forecast
                        </CardTitle>
                        <CardDescription>Revenue trends over 12 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MonthlyForecastChart
                            title=""
                            data={monthlyRevenueData}
                            dataKey1Label="Current Revenue"
                            dataKey2Label="Forecast Revenue"
                            yAxisLabel="Revenue (NPR)"
                        />
                    </CardContent>
                </Card>

                {/* Demand Forecast */}
                <Card className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Package className="h-5 w-5 text-blue-600" />
                            Monthly Demand Forecast
                        </CardTitle>
                        <CardDescription>Demand trends over 12 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MonthlyForecastChart
                            title=""
                            data={monthlyDemandData}
                            dataKey1Label="Current Demand"
                            dataKey2Label="Forecast Demand"
                            yAxisLabel="Units Sold"
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2">

                {/* Revenue Forecast Section */}
                <Card className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="relative z-10 pb-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                                    <span className="text-green-600 font-bold text-lg">1</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">30-Day Forecast</p>
                                    <CardTitle className="text-xl font-bold text-slate-900">Revenue Forecast</CardTitle>
                                </div>
                            </div>
                            <DollarSign className="h-5 w-5 text-green-500" />
                        </div>
                        <CardDescription className="text-slate-600">
                            Top 10 products by predicted revenue
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10">
                        <div className="space-y-3">
                            {revenueForecast.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="p-4 rounded-xl bg-white/60 hover:bg-white/80 border border-slate-100 hover:border-green-200 transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center text-xs font-bold text-green-700">
                                                    {index + 1}
                                                </span>
                                                <h3 className="font-bold text-slate-900 text-sm">{product.name}</h3>
                                            </div>
                                            <p className="text-xs text-slate-500">{product.category}</p>
                                        </div>
                                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${product.trend === "up" ? "bg-green-100 text-green-700" :
                                            product.trend === "down" ? "bg-red-100 text-red-700" :
                                                "bg-slate-100 text-slate-700"
                                            }`}>
                                            {product.trend === "up" ? (
                                                <ArrowUpRight className="h-3 w-3" />
                                            ) : product.trend === "down" ? (
                                                <ArrowDownRight className="h-3 w-3" />
                                            ) : null}
                                            <span className="text-xs font-bold">
                                                {Math.abs(Math.round(product.growthRate * 100))}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        <div className="bg-slate-50 p-2 rounded-lg">
                                            <p className="text-[10px] text-slate-600 mb-0.5">Current</p>
                                            <p className="text-sm font-bold text-slate-900">NPR {product.currentRevenue.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-2 rounded-lg">
                                            <p className="text-[10px] text-slate-600 mb-0.5">Forecast</p>
                                            <p className="text-sm font-bold text-green-700">NPR {product.forecastRevenue.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Demand Forecast Section */}
                <Card className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="relative z-10 pb-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <span className="text-purple-600 font-bold text-lg">2</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">30-Day Forecast</p>
                                    <CardTitle className="text-xl font-bold text-slate-900">Product Demand</CardTitle>
                                </div>
                            </div>
                            <Package className="h-5 w-5 text-purple-500" />
                        </div>
                        <CardDescription className="text-slate-600">
                            Top 10 products by predicted demand
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10">
                        <div className="space-y-3">
                            {demandForecast.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="p-4 rounded-xl bg-white/60 hover:bg-white/80 border border-slate-100 hover:border-purple-200 transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-xs font-bold text-purple-700">
                                                    {index + 1}
                                                </span>
                                                <h3 className="font-bold text-slate-900 text-sm">{product.name}</h3>
                                            </div>
                                            <p className="text-xs text-slate-500">{product.category}</p>
                                        </div>
                                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${product.changePercent > 0 ? "bg-green-100 text-green-700" :
                                            product.changePercent < 0 ? "bg-red-100 text-red-700" :
                                                "bg-slate-100 text-slate-700"
                                            }`}>
                                            {product.changePercent > 0 ? (
                                                <ArrowUpRight className="h-3 w-3" />
                                            ) : product.changePercent < 0 ? (
                                                <ArrowDownRight className="h-3 w-3" />
                                            ) : null}
                                            <span className="text-xs font-bold">
                                                {Math.abs(product.changePercent)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        <div className="bg-slate-50 p-2 rounded-lg">
                                            <p className="text-[10px] text-slate-600 mb-0.5">Current</p>
                                            <p className="text-sm font-bold text-slate-900">{product.currentDemand.toLocaleString()} units</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-2 rounded-lg">
                                            <p className="text-[10px] text-slate-600 mb-0.5">Forecast</p>
                                            <p className="text-sm font-bold text-purple-700">{product.forecastDemand.toLocaleString()} units</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Forecast Period Info */}
            <div className="max-w-7xl mx-auto mt-8">
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-indigo-600" />
                        <div>
                            <p className="font-semibold text-slate-900 text-sm">Forecast Period: Next 30 Days</p>
                            <p className="text-xs text-slate-600 mt-0.5">
                                Predictions based on historical sales trends, seasonality, and market analysis
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
