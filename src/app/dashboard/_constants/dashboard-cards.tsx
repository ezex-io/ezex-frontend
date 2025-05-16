import { ArrowUpRight, Coins, DollarSign, Users, Wallet } from "lucide-react";

export const DASHBOARD_CARDS = [
    {
        title: "Total Balance",
        value: "$45,231.89",
        description: "+20.1% from last month",
        icon: <DollarSign className="size-4 text-muted-foreground" />,
    },
    {
        title: "Active Assets",
        value: "12",
        description: "4 assets added this week",
        icon: <Coins className="size-4 text-muted-foreground" />,
    },
    {
        title: "Total Transactions",
        value: "573",
        description: "100 transactions this month",
        icon: <ArrowUpRight className="size-4 text-muted-foreground" />,
    },
    {
        title: "Connected Wallets",
        value: "3",
        description: "2 active connections",
        icon: <Wallet className="size-4 text-muted-foreground" />,
    },
];
