"use client"
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TOP_PRODUCTS, mockPredictionApi } from "@/utils/mockData";
import { TrendingUp, Package, Sparkles, DollarSign, BarChart3 } from "lucide-react";
import { PriceImpactChart } from "@/components/charts/PriceImpactChart";

export default function AIPredictionsPage() {
    // State for Price Impact Simulator
    const [selectedProduct, setSelectedProduct] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [priceImpactResult, setPriceImpactResult] = useState<any>(null);

    // State for New Product Forecast
    const [category, setCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [plannedPrice, setPlannedPrice] = useState('');
    const [newProductResult, setNewProductResult] = useState<any>(null);

    const handlePriceImpact = async () => {
        if (!selectedProduct || !newPrice) return;
        const result = await mockPredictionApi.predictPriceImpact(Number(selectedProduct), Number(newPrice));
        setPriceImpactResult(result);
    };

    const handleNewProduct = async () => {
        if (!category || !productName || !plannedPrice) return;
        const result = await mockPredictionApi.predictNewProduct(category, productName, Number(plannedPrice));
        setNewProductResult(result);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-8">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                            AI Predictions
                        </h1>
                        <p className="text-slate-600 text-sm mt-1">Simulate price changes and forecast new product performance.</p>
                    </div>
                </div>
            </div>

            {/* Two Column Grid */}
            <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2">

                {/* Section 1: Price Impact Simulator */}
                <Card className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="relative z-10 pb-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-lg">1</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Price Impact Simulator</p>
                                    <CardTitle className="text-xl font-bold text-slate-900">Adjust Existing Product Price</CardTitle>
                                </div>
                            </div>
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                        </div>
                        <CardDescription className="text-slate-600">
                            See how price changes affect revenue and demand.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="product-select" className="text-sm font-semibold text-slate-700">
                                Select Product
                            </label>
                            <select
                                id="product-select"
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-slate-700 font-medium outline-none"
                            >
                                <option value="">Choose a product</option>
                                {TOP_PRODUCTS.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} (Current: NPR {p.price})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="new-price" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-slate-500" />
                                New Price Target (NPR)
                            </label>
                            <Input
                                id="new-price"
                                type="number"
                                placeholder="0.00"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-slate-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-medium"
                            />
                        </div>

                        <Button
                            onClick={handlePriceImpact}
                            className="w-full py-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <BarChart3 className="h-5 w-5 mr-2" />
                            Simulate Impact
                        </Button>

                        {priceImpactResult && (
                            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Text Summary */}
                                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                        Impact Analysis
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-white/70 p-3 rounded-lg">
                                            <p className="text-slate-600 text-xs mb-1">Current Revenue</p>
                                            <p className="font-bold text-slate-900">NPR {priceImpactResult.currentRevenue.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-white/70 p-3 rounded-lg">
                                            <p className="text-slate-600 text-xs mb-1">Predicted Revenue</p>
                                            <p className="font-bold text-indigo-600">NPR {priceImpactResult.predictedRevenue.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-white/70 p-3 rounded-lg">
                                            <p className="text-slate-600 text-xs mb-1">Current Quantity</p>
                                            <p className="font-bold text-slate-900">{priceImpactResult.currentquantity} units</p>
                                        </div>
                                        <div className="bg-white/70 p-3 rounded-lg">
                                            <p className="text-slate-600 text-xs mb-1">Predicted Quantity</p>
                                            <p className="font-bold text-indigo-600">{priceImpactResult.predictedQuantity} units</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Graph Insights */}
                                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                        Graph Insights
                                    </h3>
                                    <PriceImpactChart
                                        currentRevenue={priceImpactResult.currentRevenue}
                                        predictedRevenue={priceImpactResult.predictedRevenue}
                                        currentQuantity={priceImpactResult.currentquantity}
                                        predictedQuantity={priceImpactResult.predictedQuantity}
                                    />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Section 2: New Product Forecast */}
                <Card className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="relative z-10 pb-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <span className="text-purple-600 font-bold text-lg">2</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">New Product Forecast</p>
                                    <CardTitle className="text-xl font-bold text-slate-900">Launch New Product</CardTitle>
                                </div>
                            </div>
                            <Package className="h-5 w-5 text-purple-500" />
                        </div>
                        <CardDescription className="text-slate-600">
                            Estimate first-month sales for a new SKU.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="category-select" className="text-sm font-semibold text-slate-700">
                                Category
                            </label>
                            <select
                                id="category-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 text-slate-700 font-medium outline-none"
                            >
                                <option value="">Choose a category</option>
                                <option value="Apparel">Apparel</option>
                                <option value="Beverages">Beverages</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Home & Kitchen">Home & Kitchen</option>
                                <option value="Personal Care">Personal Care</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="product-name" className="text-sm font-semibold text-slate-700">
                                Product Name
                            </label>
                            <Input
                                id="product-name"
                                type="text"
                                placeholder="e.g., Summer Linen Shirt"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-slate-200 hover:border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="planned-price" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-slate-500" />
                                Planned Price (NPR)
                            </label>
                            <Input
                                id="planned-price"
                                type="number"
                                placeholder="45.00"
                                value={plannedPrice}
                                onChange={(e) => setPlannedPrice(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-slate-200 hover:border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 font-medium"
                            />
                        </div>

                        <Button
                            onClick={handleNewProduct}
                            className="w-full py-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <Sparkles className="h-5 w-5 mr-2" />
                            Predict Performance
                        </Button>

                        {newProductResult && (
                            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Text Summary */}
                                <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                                        Forecast Summary
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="bg-white/70 p-3 rounded-lg">
                                            <p className="text-slate-600 text-xs mb-1">Predicted First-Month Sales</p>
                                            <p className="font-bold text-purple-600 text-lg">{newProductResult.predictedSales} units</p>
                                        </div>
                                        <div className="bg-white/70 p-3 rounded-lg">
                                            <p className="text-slate-600 text-xs mb-1">Your Planned Price</p>
                                            <p className="font-bold text-slate-900">NPR {Number(plannedPrice).toFixed(2)}</p>
                                        </div>
                                        <div className="bg-white/70 p-3 rounded-lg">
                                            <p className="text-slate-600 text-xs mb-1">AI Suggested Price</p>
                                            <p className="font-bold text-pink-600">NPR {newProductResult.suggestedPrice.toFixed(2)}</p>
                                        </div>

                                        {/* Price Recommendation */}
                                        {(() => {
                                            const priceDiff = newProductResult.suggestedPrice - Number(plannedPrice);
                                            const isDifferent = Math.abs(priceDiff) > 0.01;

                                            if (isDifferent) {
                                                const isHigher = priceDiff > 0;
                                                return (
                                                    <div className={`p-3 rounded-lg border-2 ${isHigher ? 'border-orange-200 bg-orange-50' : 'border-blue-200 bg-blue-50'}`}>
                                                        <p className="text-xs font-semibold text-slate-900 mb-1">💡 Pricing Recommendation</p>
                                                        <p className={`text-xs font-medium ${isHigher ? 'text-orange-700' : 'text-blue-700'}`}>
                                                            {isHigher
                                                                ? `Consider increasing price by NPR ${priceDiff.toFixed(2)} for optimal revenue`
                                                                : `Price is NPR ${Math.abs(priceDiff).toFixed(2)} higher than suggested - may impact sales volume`
                                                            }
                                                        </p>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div className="p-3 rounded-lg border-2 border-green-200 bg-green-50">
                                                    <p className="text-xs font-semibold text-green-700">✓ Your price aligns with AI recommendations!</p>
                                                </div>
                                            );
                                        })()}

                                        {/* Related Products Sold */}
                                        {newProductResult.similarItems && newProductResult.similarItems.length > 0 && (
                                            <div className="mt-4 p-3 rounded-lg bg-white/80 border border-purple-200">
                                                <h4 className="font-semibold text-slate-900 mb-2 text-xs">📈 Related Products in {category}</h4>
                                                <div className="space-y-2">
                                                    {newProductResult.similarItems.map((item: any) => (
                                                        <div key={item.id} className="flex items-center justify-between p-2 rounded bg-purple-50 border border-purple-100">
                                                            <div>
                                                                <p className="text-xs font-semibold text-slate-900">{item.name}</p>
                                                                <p className="text-xs text-slate-600">Price: NPR {item.price}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xs font-bold text-purple-600">{item.sales.toLocaleString()}</p>
                                                                <p className="text-xs text-slate-500">units sold</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
