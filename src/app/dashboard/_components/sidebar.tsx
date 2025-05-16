"use client";

import { Button } from "@/components/ui/button";
import { DASHBOARD_NAV_ITEMS } from "../_constants/nav-items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { FC } from "react";

const DashboardSidebar: FC = () => {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-64 flex-col border-r bg-background px-4 py-6">
            <div className="flex items-center gap-2 px-2">
                <span className="text-xl font-bold">ezeX</span>
            </div>

            <nav className="mt-8 flex flex-1 flex-col gap-1">
                {DASHBOARD_NAV_ITEMS.map(item => (
                    <Link key={item.href} href={item.href}>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-2",
                                pathname === item.href &&
                                    "bg-primary-500/10 text-primary-500 hover:bg-primary-500/20",
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </nav>

            <div className="border-t pt-4">
                <Button variant="outline" className="w-full justify-start gap-2">
                    Logout
                </Button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
