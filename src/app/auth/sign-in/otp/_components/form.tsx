"use client";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { FC } from "react";
import Counter from "./counter";

const OTPForm: FC = () => {
    const handleResendOTP = () => {};

    return (
        <form className="flex w-full flex-col items-center">
            <label htmlFor="otp" className="mb-4 self-start">
                Enter code
            </label>

            <InputOTP
                id="otp"
                maxLength={6}
                inputMode="numeric"
                pattern={REGEXP_ONLY_DIGITS}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={2} />
                </InputOTPGroup>

                <InputOTPSeparator className="text-primary-600 lg:mx-6" />

                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={4} />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>

            <Link href="mailto:test@gmail.com" className="w-full">
                <Button
                    size="lg"
                    type="button"
                    color="primary"
                    className="mt-8 w-full"
                >
                    Open Email
                </Button>
            </Link>

            <Counter onReset={handleResendOTP} />

            <Link href="/auth/sign-in/email">
                <Button
                    variant="link"
                    type="button"
                    className="text-primary-500"
                >
                    Go back
                </Button>
            </Link>
        </form>
    );
};

export default OTPForm;
