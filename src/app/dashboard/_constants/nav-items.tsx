import { BarChart3, Coins, CreditCard, Settings, Users } from "lucide-react";

export const DASHBOARD_NAV_ITEMS = [
    {
        label: "Overview",
        icon: <BarChart3 className="size-4" />,
        href: "/dashboard",
    },
    {
        label: "Transactions",
        icon: <CreditCard className="size-4" />,
        href: "/dashboard/transactions",
    },
    {
        label: "Assets",
        icon: <Coins className="size-4" />,
        href: "/dashboard/assets",
    },
    {
        label: "Profile",
        icon: <Users className="size-4" />,
        href: "/dashboard/profile",
    },
    {
        label: "Settings",
        icon: <Settings className="size-4" />,
        href: "/dashboard/settings",
    },
];
