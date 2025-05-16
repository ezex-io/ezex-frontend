"use client";

import SecurityImageGrid from "@/app/auth/sign-up/security/_components/security-image-grid";
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
import PasswordInput from "@/components/ui/password-input";
import { PATHS } from "@/constants/paths.constant";
import { createUserAPI } from "@/lib/axios/firebase/create-user-with-email-password";
import { processAuthTokenAPI } from "@/lib/graphql/mutations/process-auth-token";
import { saveSecurityImageAPI } from "@/lib/graphql/mutations/save-security-image";
import { useSignupStore } from "@/stores/signup/signup.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PASSWORD_FORM_INITIAL_VALUES } from "../_constants/verification-images";
import {
    passwordFormSchema,
    PasswordFormValues,
} from "../_schemas/password-form.schema";

const SecurityVerificationForm = () => {
    const router = useRouter();
    const verifiedEmail = useSignupStore(state => state.verifiedEmail);

    useEffect(() => {
        if (!verifiedEmail) {
            router.replace(PATHS.SigninEmailPage);
        }
    }, [verifiedEmail]);

    const createUserMutation = useMutation({
        mutationFn: createUserAPI,
    });

    const processAuthTokenMutation = useMutation({
        mutationFn: processAuthTokenAPI,
    });

    const setSecurityImageMutation = useMutation({
        mutationFn: saveSecurityImageAPI,
    });

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: PASSWORD_FORM_INITIAL_VALUES,
    });

    const onSubmit = form.handleSubmit(async (values) => {
        if (!verifiedEmail) return;

        try {
            // Step 1: Create user in Firebase
            const firebaseResponse = await createUserMutation.mutateAsync({
                email: verifiedEmail,
                password: values.password,
            });

            // Step 2: Get the ID token and process it
            const idToken = await firebaseResponse.user.getIdToken();

            await processAuthTokenMutation.mutateAsync({
                id_token: idToken,
            });

            // Step 3: Save security image
            await setSecurityImageMutation.mutateAsync({
                email: verifiedEmail,
                security_image: values.imageId.toString(),
                security_phrase: "", // TODO: add security phrase
            });

            // Success - everything worked
            toast.success("Welcome to ezeX!");
            router.push(PATHS.Dashboard);
        } catch (error) {
            let message = "An unknown error occurred";

            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        message = "This email is already in use.";
                        break;
                    case "auth/invalid-email":
                        message = "The email address is not valid.";
                        break;
                    case "auth/operation-not-allowed":
                        message = "Email/password accounts are not enabled.";
                        break;
                    case "auth/weak-password":
                        message = "The password is too weak.";
                        break;
                    default:
                        message = error.message;
                }
            }

            toast.error(message);
        }
    });

    // Watch the imageId value to use in the UI
    const selectedImage = form.watch("imageId");

    const handleImageSelect = (imageId: number) => {
        // If the same image is clicked again, deselect it
        if (selectedImage === imageId) {
            form.resetField("imageId");
        } else {
            form.setValue("imageId", imageId, { shouldValidate: true });
            form.clearErrors("imageId");
        }
    };

    const isPending =
        createUserMutation.isPending ||
        processAuthTokenMutation.isPending ||
        setSecurityImageMutation.isPending;

    return (
        <Form {...form}>
            <form
                onSubmit={onSubmit}
                className="flex w-full flex-col"
                aria-label="Security Verification Form"
            >
                <p className="mt-5 mb-4 text-sm text-gray-300 sm:text-base">
                    To enhance your account security against phishing, please
                    select one image from the 16 displayed.
                </p>

                <SecurityImageGrid
                    selectedImage={selectedImage}
                    onImageSelect={handleImageSelect}
                />

                {form.formState.errors.imageId && (
                    <p className="mb-4 text-sm text-red-500" role="alert">
                        {form.formState.errors.imageId.message}
                    </p>
                )}

                <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-4">
                                    Choose a strong password.
                                </FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        {...field}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordInput
                                        {...field}
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col space-y-4">
                    <Button
                        size="lg"
                        type="submit"
                        className="bg-primary-500 hover:bg-primary-600 mt-6 w-full sm:mt-8"
                        disabled={isPending}
                        color="primary"
                        isLoading={isPending}
                    >
                        Continue
                    </Button>
                    <Button
                        type="button"
                        variant="link"
                        className="text-primary-500"
                        onClick={() => router.push(PATHS.SigninEmailPage)}
                        disabled={isPending}
                    >
                        Go Back
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SecurityVerificationForm;
