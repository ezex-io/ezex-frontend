import Providers from "@/providers/providers";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { FC, PropsWithChildren } from "react";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ezex - Easy Exchange",
    description: "Created by Pactus Team",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en" className="dark">
            <Providers>
                <body
                    className={`${inter.variable} ${robotoMono.variable} min-h-svh max-w-screen font-sans antialiased`}
                >
                    {children}
                </body>
            </Providers>
        </html>
    );
};

export default RootLayout;
