"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import PasswordInput from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PASSWORD_FORM_INITIAL_VALUES } from "../_constants/password-form.constant";
import {
    passwordFormSchema,
    PasswordFormValues,
} from "../_schemas/email-form.schema";
import { useSigninStore } from "@/stores/signin/signin.store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/paths.constant";
import { VERIFICATION_IMAGES } from "@/app/auth/sign-up/security/_constants/verification-images";
import Image from "next/image";
import { signinWithEmailAndPasswordAPI } from "@/lib/axios/firebase/sign-in-with-email-and-password";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";

const PasswordForm = () => {
    const router = useRouter();
    const email = useSigninStore(state => state.email);
    const pictureName = useSigninStore(state => state.pictureName);

    const securityImage = VERIFICATION_IMAGES.find(img => img.id === Number(pictureName));

    useEffect(() => {
        if (!email || !pictureName || !securityImage) {
            router.push(PATHS.SigninEmailPage);
        }
    }, [email, pictureName, securityImage]);

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: PASSWORD_FORM_INITIAL_VALUES,
    });

    const passwordLoginMutation = useMutation({
        mutationFn: signinWithEmailAndPasswordAPI,
    });

    const onSubmit = form.handleSubmit(values => {
        if (!values.itIsMe) {
            return;
        }

        passwordLoginMutation.mutate(
            {
                email: email as string,
                password: values.password,
            },
            {
                async onSuccess() {
                    toast.success("Successful login");
                    router.replace(PATHS.Dashboard);
                },
                onError(error) {
                    let message = "An unknown error occurred";

                    if (error instanceof FirebaseError) {
                        switch (error.code) {
                            case "auth/invalid-credential":
                                message = "Invalid email or password";
                                break;
                            case "auth/user-disabled":
                                message = "This account has been disabled.";
                                break;
                            case "auth/user-not-found":
                                message = "No user found with this email.";
                                break;
                            case "auth/wrong-password":
                                message = "Incorrect password.";
                                break;
                            default:
                                message = error.message;
                        }
                    }

                    toast.error(message);
                },
            },
        );
    });

    const isItMe = form.watch("itIsMe");
    const isPending = passwordLoginMutation.isPending;

    return (
        <Form {...form}>
            <form
                className="flex min-h-[22.25rem] flex-col"
                onSubmit={onSubmit}
            >
                {securityImage && (
                    <div className="relative mx-auto mb-6 aspect-square h-[12.5rem] w-[12.5rem] overflow-hidden rounded-lg border-2 border-gray-700">
                        <Image
                            src={securityImage.path}
                            alt={securityImage.alt}
                            fill
                            sizes="(max-width: 768px) 200px, 200px"
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <FormField
                    control={form.control}
                    name="itIsMe"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Is it your Image?</FormLabel>
                                <FormDescription>
                                    if the image above is not your selected
                                    image in signup proccess, you are in a
                                    phishing website. make sure the domain is
                                    correct:{" "}
                                    <span className="text-primary-500 mx-2">
                                        https://ezex.io
                                    </span>
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                {isItMe && (
                    <>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel className="mb-4">
                                        Enter your Password
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            {...field}
                                            placeholder="Your password"
                                        />
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
                            disabled={isPending}
                            isLoading={isPending}
                        >
                            Login
                        </Button>
                    </>
                )}
            </form>
        </Form>
    );
};

export default PasswordForm;
