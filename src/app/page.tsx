"use client";

import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <Typography
                data-testid="homepage-title"
                weight="bold"
                variant="body/xl"
                responsiveVariant={{
                    sm: "body/2xl",
                    md: "heading/lg",
                    lg: "heading/xl",
                    xl: "display/xl",
                }}
            >
                Welcome to EZEX Exchange!
            </Typography>

            <Link
                href="/auth/sign-in/email"
                className={cn(buttonVariants(), "mt-10")}
            >
                Signup
            </Link>
        </div>
    );
}
