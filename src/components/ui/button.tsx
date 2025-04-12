"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import OrbitingDotsLoading from "./orbitingDotsLoading";

/**
 * Utility class generator for the Button component using `class-variance-authority`.
 * Handles different variants, sizes, icon modes, color overrides, and disabled states.
 */
const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
    {
        variants: {
            /** Visual style of the button */
            variant: {
                default: "bg-primary text-white shadow-xs hover:bg-primary/90",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
                outline:
                    "border border-primary text-primary bg-background shadow-xs hover:border-primary-400 hover:text-primary-400",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                text: "text-primary",
            },
            /** Button size: affects height, font, and icon spacing */
            size: {
                xs: "h-6 text-xs rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 [&_svg]:!size-3.5",
                sm: "h-8 text-sm rounded-lg gap-2 px-4 has-[>svg]:px-3 [&_svg]:!size-4",
                md: "h-10 text-base rounded-lg px-6 has-[>svg]:px-3 [&_svg]:!size-5",
                lg: "h-12 text-base rounded-lg px-6 has-[>svg]:px-4 [&_svg]:!size-5",
                xl: "h-14 text-lg rounded-lg px-6 has-[>svg]:px-4 [&_svg]:!size-6",
            },
            /** Whether this is an icon-only button (no padding) */
            icon: {
                true: "px-0",
                false: "",
            },
            /** Adds cursor styling for disabled buttons */
            disabled: {
                true: "cursor-not-allowed",
                false: "",
            },
            /** Optional palette-based color override */
            color: {
                white: "bg-white text-black hover:bg-white/90",
                primary: "bg-primary-500 text-white hover:bg-primary-500/90",
            },
            isLoading: {
                true: "cursor-wait",
                false: "",
            },
        },
        compoundVariants: [
            // Handle square icon-only buttons by size
            { icon: true, size: "xs", className: "size-6" },
            { icon: true, size: "sm", className: "size-8" },
            { icon: true, size: "md", className: "size-10" },
            { icon: true, size: "lg", className: "size-12" },
            { icon: true, size: "xl", className: "size-14" },

            // Disabled state overrides
            {
                variant: "default",
                disabled: true,
                className: "bg-accent text-accent-foreground ",
            },
            {
                variant: "outline",
                disabled: true,
                className: "border-accent-foreground text-accent-foreground ",
            },
            {
                variant: ["text", "link", "ghost"],
                disabled: true,
                className: "text-accent-foreground",
            },

            // isLoading state overrides
            {
                size: "md",
                isLoading: true,
                className: "text-xl",
            },
            {
                size: "lg",
                isLoading: true,
                className: "text-2xl",
            },
            {
                size: "xl",
                isLoading: true,
                className: "text-3xl",
            },
        ],
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    },
);

/**
 * Button component that supports multiple variants, sizes, icon alignment, and loading state.
 *
 * @param {Object} props - Props passed to the button
 * @param {'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'text'} [props.variant] - Visual style of the button
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [props.size] - Size of the button
 * @param {'white' | 'primary'} [props.color] - Optional color override
 * @param {boolean} [props.asChild=false] - If true, uses `Slot` to render a custom component
 * @param {React.ReactNode} [props.iconLeft] - Icon displayed on the left of the content
 * @param {React.ReactNode} [props.iconRight] - Icon displayed on the right of the content
 * @param {boolean} [props.icon] - Whether the button is icon-only (square)
 * @param {boolean} [props.isLoading] - Whether to show a loading state
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @param {string} [props.className] - Additional custom class names
 * @param {React.ReactNode} [props.children] - Content inside the button
 */
function Button({
    className,
    variant,
    size,
    color,
    asChild = false,
    children,
    iconLeft: IconLeft,
    iconRight: IconRight,
    isLoading,
    icon,
    disabled,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        iconLeft?: React.ReactNode;
        iconRight?: React.ReactNode;
        isLoading?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn(
                disabled,
                buttonVariants({
                    variant,
                    size,
                    className,
                    color,
                    icon,
                    disabled,
                    isLoading,
                }),
            )}
            disabled={disabled}
            {...props}
        >
            {IconLeft && (
                <span className={cn(isLoading && "invisible")}>{IconLeft}</span>
            )}
            <span className={cn(isLoading && "invisible")}>{children}</span>
            {IconRight && (
                <span className={cn(isLoading && "invisible")}>
                    {IconRight}
                </span>
            )}
            {isLoading && (
                <span className="absolute">
                    <OrbitingDotsLoading />
                </span>
            )}
        </Comp>
    );
}

export { Button, buttonVariants };
