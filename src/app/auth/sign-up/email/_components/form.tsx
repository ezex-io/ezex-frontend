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
import {
    DeliveryMethod,
    sendConfirmationCodeAPI,
} from "@/lib/graphql/mutations/send-confirmation-code";
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

const EmailForm = () => {
    const router = useRouter();
    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailFormSchema),
        defaultValues: EMAIL_FORM_INITIAL_VALUES,
    });

    const sendOTPMutation = useMutation({
        mutationFn: sendConfirmationCodeAPI,
    });

    const onSubmit = form.handleSubmit(values => {
        sendOTPMutation.mutate(
            {
                method: DeliveryMethod.EMAIL,
                recipient: values.email,
            },
            {
                onSuccess() {
                    toast.success("Confirmation Code Sent Successfully");
                    router.push(`${PATHS.SignupOTPPage}?email=${values.email}`);
                },
            },
        );
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
                    disabled={sendOTPMutation.isPending}
                    isLoading={sendOTPMutation.isPending}
                >
                    Continue
                </Button>
            </form>
        </Form>
    );
};

export default EmailForm;
