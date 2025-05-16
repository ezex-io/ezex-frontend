"use client";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { PATHS } from "@/constants/paths.constant";
import { verifyConfirmationCodeAPI } from "@/lib/graphql/mutations/verify-confirmation-code";
import { useSignupStore } from "@/stores/signup/signup.store";
import { toSafeString } from "@/utils/stringUtils/stringUtils";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import Counter from "./counter";
import { toast } from "sonner";

const OTPForm: FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = toSafeString(searchParams.get("email"));
    const setVerifiedEmail = useSignupStore(state => state.setVerifiedEmail);

    useEffect(() => {
        if (!email) {
            router.replace(PATHS.SignupEmailPage);
        }
    }, [email, router]);

    const verifyOTPMutation = useMutation({
        mutationFn: verifyConfirmationCodeAPI,
    });

    const onComplete = (code: string) => {
        console.log(code);
        verifyOTPMutation.mutate(
            {
                code,
                recipient: email,
            },
            {
                onSuccess(_, variables) {
                    toast.success("Your email verified successfully");
                    setVerifiedEmail(variables.recipient);
                    router.push(PATHS.SignupSecurityPage);
                },
            },
        );
    };

    return (
        <form
            onSubmit={e => e.preventDefault()}
            className="flex w-full flex-col items-center"
        >
            <p className="mt-5 mb-8 text-gray-300">
                Verify your email {email}. This helps us keep your account
                secure by verifying that it’s really you.
            </p>

            <label htmlFor="otp" className="mb-4 self-start">
                Enter code
            </label>

            <InputOTP
                id="otp"
                maxLength={6}
                inputMode="numeric"
                pattern={REGEXP_ONLY_DIGITS}
                onComplete={onComplete}
                disabled={verifyOTPMutation.isPending}
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

            <Link href={`mailto:${email}`} className="w-full">
                <Button
                    size="lg"
                    type="button"
                    color="primary"
                    className="mt-8 w-full"
                    disabled={verifyOTPMutation.isPending}
                >
                    Open Email
                </Button>
            </Link>

            <Counter recipient={email} />

            <Link href={PATHS.SigninEmailPage}>
                <Button
                    variant="link"
                    type="button"
                    className="text-primary-500"
                    disabled={verifyOTPMutation.isPending}
                >
                    Go back
                </Button>
            </Link>
        </form>
    );
};

export default OTPForm;
