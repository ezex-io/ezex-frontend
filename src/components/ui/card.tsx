import { cn } from "@/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "rounded-xl border bg-card text-card-foreground shadow-sm",
                className,
            )}
            {...props}
        />
    ),
);
Card.displayName = "Card";

export const CardHeader = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

export const CardContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";
