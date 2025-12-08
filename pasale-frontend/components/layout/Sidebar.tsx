"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LineChart, Settings, ShoppingBag, LogOut, TrendingUp, Lightbulb } from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Predictions", href: "/predictions", icon: LineChart },
    { name: "AI Forecasting", href: "/forecasting", icon: TrendingUp },
    { name: "Recommendations", href: "/recommendations", icon: Lightbulb },
    { name: "Products", href: "/products", icon: ShoppingBag },
    { name: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col justify-between border-r border-white/20 bg-gradient-to-br from-white/70 via-white/60 to-white/50 backdrop-blur-2xl p-6 shadow-2xl relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />

            <div className="relative z-10">
                <div className="mb-10 group cursor-pointer">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                            P
                        </div>
                        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Pasale</span>
                    </div>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 group relative overflow-hidden",
                                    isActive
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                                        : "text-slate-700 hover:bg-white/60 hover:shadow-md"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-xl" />
                                )}
                                <div className={cn(
                                    "p-2 rounded-lg transition-all duration-300",
                                    isActive
                                        ? "bg-white/20"
                                        : "bg-indigo-100/50 group-hover:bg-indigo-100"
                                )}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <span className="relative">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <button className="relative z-10 flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-red-600 hover:bg-red-50/80 hover:shadow-md transition-all duration-300 group">
                <div className="p-2 rounded-lg bg-red-100/70 group-hover:bg-red-100 transition-all duration-300">
                    <LogOut className="h-4 w-4" />
                </div>
                <span>Log Out</span>
            </button>
        </div>
    );
}
