"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NEPAL_DISTRICTS, getDistrictTopProducts } from '@/utils/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, TrendingUp } from 'lucide-react';

export function RegionalTopProducts() {
    const [selectedDistrict, setSelectedDistrict] = useState<string>("Kathmandu");
    const topProducts = getDistrictTopProducts(selectedDistrict);

    return (
        <Card className="glass-card col-span-4 h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Regional Market Analysis
                    </CardTitle>
                    <CardDescription>Top selling products by district</CardDescription>
                </div>
                <div className="w-[180px]">
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                            {NEPAL_DISTRICTS.map((district) => (
                                <SelectItem key={district} value={district}>
                                    {district}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-2">
                    {topProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-white/40 border border-white/50 hover:bg-white/60 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                    #{index + 1}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">{product.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-900">{product.sales.toLocaleString()} sold</p>
                                <p className="text-xs text-green-600 flex items-center justify-end gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    Demand High
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
