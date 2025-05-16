import { FC, PropsWithChildren } from "react";
import DashboardSidebar from "./_components/sidebar";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <main className="main-container flex min-h-screen">
            <DashboardSidebar />
            <div className="flex-1 overflow-auto p-6">
                {children}
            </div>
        </main>
    );
};

export default DashboardLayout;
