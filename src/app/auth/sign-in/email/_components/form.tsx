"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PATHS } from "@/constants/paths.constant";
import { getSecurityImageAPI, SecurityImageResponse } from "@/lib/graphql/mutations/get-security-image";
import { useSigninStore } from "@/stores/signin/signin.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EMAIL_FORM_INITIAL_VALUES } from "../_constants/email-form.constant";
import {
    emailFormSchema,
    EmailFormValues,
} from "../_schemas/email-form.schema";

interface GraphQLError extends Error {
    response?: {
        errors?: Array<{ message: string }>;
    };
}

const EmailForm = () => {
    const router = useRouter();
    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailFormSchema),
        defaultValues: EMAIL_FORM_INITIAL_VALUES,
    });

    const setEmail = useSigninStore(state => state.setEmail);
    const setPictureName = useSigninStore(state => state.setPictureName);

    const getEmailPictureInfo = useMutation<SecurityImageResponse, GraphQLError, string>({
        mutationFn: async (email: string) => {
            return await getSecurityImageAPI({ email });
        },
    });

    const onSubmit = form.handleSubmit(values => {
        getEmailPictureInfo.mutate(values.email, {
            onSuccess(response) {
                const { security_image } = response.getSecurityImage;

                if (!security_image) {
                    toast.error("Account not found");

                    return;
                }

                setEmail(values.email);
                setPictureName(security_image);

                router.push(PATHS.SigninPasswordPage);
            },
            onError(error: GraphQLError) {
                let message = "Failed to get account information";

                // Handle GraphQL errors
                const gqlError = error?.response?.errors?.[0]?.message;

                if (gqlError) {
                    switch (true) {
                        case gqlError.includes("no rows in result set"):
                            message = "Account not found. Please check your email or sign up.";
                            break;
                        case gqlError.includes("invalid email format"):
                            message = "Invalid email format";
                            break;
                        case gqlError.includes("account is locked"):
                            message = "Account is locked. Please contact support.";
                            break;
                        case gqlError.includes("account is disabled"):
                            message = "Account is disabled. Please contact support.";
                            break;
                        default:
                            // If it's a GraphQL error but not one we explicitly handle
                            message = gqlError;
                    }
                } else if (error instanceof Error) {
                    // Handle network or other errors
                    switch (error.message) {
                        case "Network Error":
                            message = "Unable to connect to server. Please check your internet connection.";
                            break;
                        case "Timeout":
                            message = "Request timed out. Please try again.";
                            break;
                        default:
                            message = error.message;
                    }
                }

                toast.error(message);
            },
        });
    });

    return (
        <Form {...form}>
            <form className="flex flex-col" onSubmit={onSubmit}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-4">
                                Enter your Email address
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="email address" />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    size="lg"
                    type="submit"
                    color="primary"
                    className="mt-4 lg:mt-8"
                    disabled={getEmailPictureInfo.isPending}
                    isLoading={getEmailPictureInfo.isPending}
                >
                    Continue
                </Button>
            </form>
        </Form>
    );
};

export default EmailForm;
