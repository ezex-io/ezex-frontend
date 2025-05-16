import { FC } from "react";
import DashboardContent from "./_components/dashboard-content";

export const metadata = {
    title: "Dashboard | EZEX",
    description: "Your EZEX Dashboard",
};

const DashboardPage: FC = () => {
    return (
        <div className="flex w-full flex-col p-4">
            <h1 className="mb-6 text-3xl font-bold">
                Welcome to <span className="text-primary-500">ezeX</span>
            </h1>

            <DashboardContent />
        </div>
    );
};

export default DashboardPage;
