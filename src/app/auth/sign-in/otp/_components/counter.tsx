"use client";

import { Button } from "@/components/ui/button";
import { useCountdown } from "@/hooks/useCountdown/useCountdown";
import { seconds } from "@/utils/timeUtils/timeUtils";
import { FC, useEffect } from "react";

export interface CounterProps {
    onReset: () => void;
}

const Counter: FC<CounterProps> = ({ onReset }) => {
    const [count, { startCountdown, resetCountdown }] = useCountdown({
        countStart: 60, // 60 seconds
        intervalMs: seconds(1),
    });

    useEffect(() => {
        startCountdown();
    }, []);

    const handleResendClick = () => {
        resetCountdown();
        startCountdown();
        onReset();
    };

    const isFinished = count === 0;

    return (
        <Button
            type="button"
            variant="outline"
            disabled={!isFinished}
            onClick={handleResendClick}
            className="mt-4 mb-16 w-full"
            size="lg"
        >
            {isFinished
                ? "Resend"
                : `Resend code in 
                ${count}`}
        </Button>
    );
};

export default Counter;
