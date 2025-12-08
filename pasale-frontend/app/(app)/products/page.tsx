"use client"

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOP_PRODUCTS } from '@/utils/mockData';
import { Search, Filter, ShoppingBag } from 'lucide-react';

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(TOP_PRODUCTS.map(p => p.category));
        return ["All", ...Array.from(cats).sort()];
    }, []);

    // Filter products
    const filteredProducts = useMemo(() => {
        return TOP_PRODUCTS.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products Catalog</h1>
                    <p className="text-muted-foreground">Manage and analyze your inventory performance</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative w-full sm:w-[300px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            className="pl-10 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-white">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(category => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                        <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                                        <ShoppingBag className="h-5 w-5 text-indigo-600" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1 mb-2">
                                    <h3 className="font-semibold text-lg text-slate-900 truncate" title={product.name}>{product.name}</h3>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.category}</p>
                                </div>
                                <div className="flex items-end justify-between mt-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Price</p>
                                        <p className="font-bold text-lg text-slate-900">${product.price}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">Sales</p>
                                        <p className="font-medium text-slate-700">{product.sales}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                        <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
}
