"use client";

import { cn } from "@/utils/cn";
import { FC, useCallback } from "react";

export interface PaginationProps {
    id: string;
    count: number;
    current: number;

    className?: string;
}

const Pagination: FC<PaginationProps> = ({ id, count, current, className }) => {
    const PaginationCells = useCallback(() => {
        return Array.from({ length: count }).map((_, index) => (
            <div
                key={`pagination-cell-${id}-${index}`}
                className={cn("bg-primary-900 h-1.5 w-10 rounded-2xl", {
                    "bg-white": current === index + 1,
                })}
            />
        ));
    }, [count, current]);

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <PaginationCells />
        </div>
    );
};

export default Pagination;
