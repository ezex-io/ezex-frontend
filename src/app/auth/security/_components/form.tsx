"use client";

import SecurityImageGrid from "@/app/auth/security/_components/security-image-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Constants for validation
const MEMORABLE_WORD_MIN_LENGTH = 4;
const MEMORABLE_WORD_MAX_LENGTH = 50;

// Define the form schema with Zod
const securityFormSchema = z.object({
    imageId: z.number({
        required_error: "Please select a security image.",
        invalid_type_error: "Please select a security image.",
    }),
    memorableWord: z
        .string()
        .min(
            MEMORABLE_WORD_MIN_LENGTH,
            `Memorable word must be at least ${MEMORABLE_WORD_MIN_LENGTH} characters long.`,
        )
        .max(
            MEMORABLE_WORD_MAX_LENGTH,
            `Memorable word cannot exceed ${MEMORABLE_WORD_MAX_LENGTH} characters.`,
        )
        .trim(),
});

// Type for the form values
type SecurityFormValues = z.infer<typeof securityFormSchema>;

const SecurityVerificationForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Initialize React Hook Form with Zod validation
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        clearErrors,
        resetField,
    } = useForm<SecurityFormValues>({
        resolver: zodResolver(securityFormSchema),
        defaultValues: {
            memorableWord: "",
        },
    });

    // Watch the imageId value to use in the UI
    const selectedImage = watch("imageId");

    const handleImageSelect = (imageId: number) => {
        // If the same image is clicked again, deselect it
        if (selectedImage === imageId) {
            resetField("imageId");
        } else {
            setValue("imageId", imageId, { shouldValidate: true });
            clearErrors("imageId");
        }
    };

    const onSubmit = async (data: SecurityFormValues) => {
        setIsSubmitting(true);
        try {
            // TODO: Replace with actual secure API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Saving verification", {
                imageId: data.imageId,
                wordLength: data.memorableWord.length,
            });
        } catch (error) {
            console.error("Verification failed:", error);
            // You can set a form-level error here if needed
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col"
            aria-label="Security Verification Form"
        >
            <p className="mt-5 mb-4 text-sm text-gray-300 sm:text-base">
                To enhance your account security against phishing, please select
                one image from the 16 displayed.
            </p>

            <SecurityImageGrid
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
            />

            {errors.imageId && (
                <p className="mb-4 text-sm text-red-500" role="alert">
                    {errors.imageId.message}
                </p>
            )}

            <label htmlFor="memorableWord" className="mb-4">
                Choose any memorable word of your choice
            </label>

            <Input
                id="memorableWord"
                type="text"
                placeholder="For example, you might use your pet's name."
                className="w-full text-white placeholder-gray-500"
                aria-required="true"
                maxLength={MEMORABLE_WORD_MAX_LENGTH}
                {...register("memorableWord")}
            />

            {errors.memorableWord && (
                <p className="mt-2 text-sm text-red-500" role="alert">
                    {errors.memorableWord.message}
                </p>
            )}

            <div className="flex flex-col space-y-4">
                <Button
                    size="lg"
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 mt-6 w-full sm:mt-8"
                    disabled={isSubmitting}
                    color="primary"
                >
                    {isSubmitting ? "Processing..." : "Continue"}
                </Button>
                <Button
                    type="button"
                    variant="link"
                    className="text-primary-500"
                    onClick={() => router.push("/auth/sign-in/email")}
                    disabled={isSubmitting}
                >
                    Go Back
                </Button>
            </div>
        </form>
    );
};

export default SecurityVerificationForm;
