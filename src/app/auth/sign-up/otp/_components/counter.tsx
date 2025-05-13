"use client";

import { Button } from "@/components/ui/button";
import { useCountdown } from "@/hooks/useCountdown/useCountdown";
import {
    DeliveryMethod,
    sendConfirmationCodeAPI,
} from "@/lib/graphql/mutations/send-confirmation-code";
import { seconds } from "@/utils/timeUtils/timeUtils";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { toast } from "sonner";

export interface CounterProps {
    recipient: string;
}

const Counter: FC<CounterProps> = ({ recipient }) => {
    const [count, { startCountdown, resetCountdown }] = useCountdown({
        countStart: 60, // 60 seconds TODO: ask for rate limit time and replace here
        intervalMs: seconds(1),
    });

    useEffect(() => {
        startCountdown();
    }, []);

    const sendOTPMutation = useMutation({
        mutationFn: sendConfirmationCodeAPI,
    });

    const handleResendClick = () => {
        sendOTPMutation.mutate(
            {
                method: DeliveryMethod.EMAIL,
                recipient,
            },
            {
                onSuccess() {
                    toast.success("Confirmation Code Sent Successfully");
                    resetCountdown();
                    startCountdown();
                },
            },
        );
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
            isLoading={sendOTPMutation.isPending}
        >
            {isFinished && <span>Resend</span>}
            {!isFinished && <span>Resend code in {count}</span>}
        </Button>
    );
};

export default Counter;
