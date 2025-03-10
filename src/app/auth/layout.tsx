import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import LayoutCarousel from "./_components/carousel";

export const metadata: Metadata = {
    title: "Ezex - Sign-In",
    description: "Created by Pactus Team",
};

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <main className="main-container flex min-h-screen items-center justify-between px-4 py-6">
            <LayoutCarousel />
            <div className="flex h-full w-full items-center justify-center">
                {children}
            </div>
        </main>
    );
};

export default AuthLayout;
