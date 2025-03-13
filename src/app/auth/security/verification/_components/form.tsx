"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VERIFICATION_IMAGES } from "@/features/security/config/verification-images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type VerificationImage = {
    id: number;
    name: string;
    alt: string;
};

// Constants for validation
const MEMORABLE_WORD_MIN_LENGTH = 4;
const MEMORABLE_WORD_MAX_LENGTH = 50;

// Component for image selection grid
const SecurityImageGrid = ({
    selectedImage,
    onImageSelect,
}: {
    selectedImage: number | null;
    onImageSelect: (imageId: number) => void;
}) => {
    return (
        <div className="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-4 sm:gap-4 md:grid-cols-4">
            {VERIFICATION_IMAGES.map((image: VerificationImage) => (
                <button
                    key={image.id}
                    onClick={() => onImageSelect(image.id)}
                    className={
                        selectedImage === image.id
                            ? "group relative aspect-square overflow-hidden rounded-lg border-2 border-green-500 ring-4 ring-green-300 transition-all duration-300"
                            : "group relative aspect-square overflow-hidden rounded-lg border-2 border-gray-700 transition-all duration-300 hover:border-gray-500"
                    }
                    aria-label={`Select ${image.name} image`}
                    aria-pressed={selectedImage === image.id}
                >
                    <Image
                        src={`/images/security/${image.name.toLowerCase().replace(" ", "-")}.png`}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                    {selectedImage === image.id && (
                        <div
                            className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white"
                            aria-hidden="true"
                        >
                            ✓
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

// Validation utility functions
const validateMemorableWord = (
    word: string,
): { isValid: boolean; error?: string } => {
    const trimmedWord = word.trim();

    if (!trimmedWord) {
        return {
            isValid: false,
            error: "Memorable word is required.",
        };
    }

    if (trimmedWord.length < MEMORABLE_WORD_MIN_LENGTH) {
        return {
            isValid: false,
            error: `Memorable word must be at least ${MEMORABLE_WORD_MIN_LENGTH} characters long.`,
        };
    }

    if (trimmedWord.length > MEMORABLE_WORD_MAX_LENGTH) {
        return {
            isValid: false,
            error: `Memorable word cannot exceed ${MEMORABLE_WORD_MAX_LENGTH} characters.`,
        };
    }

    return { isValid: true };
};

const SecurityVerificationForm = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [memorableWord, setMemorableWord] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageError, setImageError] = useState<string | null>(null);
    const [wordError, setWordError] = useState<string | null>(null);
    const router = useRouter();

    const handleImageSelect = (imageId: number) => {
        setSelectedImage(prevSelected =>
            prevSelected === imageId ? null : imageId,
        );
        setImageError(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset errors
        setImageError(null);
        setWordError(null);

        // Validate image selection
        if (selectedImage === null) {
            setImageError("Please select a security image.");
            return;
        }

        // Validate memorable word
        const wordValidation = validateMemorableWord(memorableWord);
        if (!wordValidation.isValid) {
            setWordError(wordValidation.error || "Invalid memorable word.");
            return;
        }

        setIsSubmitting(true);
        try {
            // TODO: Replace with actual secure API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const sanitizedImageId = Number(selectedImage);
            const sanitizedWord = memorableWord.trim();

            console.log("Saving verification", {
                imageId: sanitizedImageId,
                wordLength: sanitizedWord.length,
            });

            // Navigate to the next page after successful submission
        } catch (error) {
            console.error("Verification failed:", error);
            setWordError("Verification failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
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

            {imageError && (
                <p className="mb-4 text-sm text-red-500" role="alert">
                    {imageError}
                </p>
            )}

            <label htmlFor="memorable-word" className="mb-4">
                Choose any memorable word of your choice
            </label>

            <Input
                id="memorable-word"
                type="text"
                placeholder="For example, you might use your pet's name."
                value={memorableWord}
                onChange={e => setMemorableWord(e.target.value)}
                className="w-full border-[#0D4733] text-white placeholder-gray-500 focus:border-[#0D4733] focus:ring-[#0D4733]"
                aria-required="true"
                maxLength={MEMORABLE_WORD_MAX_LENGTH}
            />

            {wordError && (
                <p className="mt-2 text-sm text-red-500" role="alert">
                    {wordError}
                </p>
            )}

            <div className="mt-8 flex flex-col space-y-4">
                <Button
                    size="lg"
                    type="submit"
                    color="primary"
                    className="mt-8 w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Processing..." : "Continue"}
                </Button>
                <Button
                    type="button"
                    variant="link"
                    className="text-primary-500"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Go Back
                </Button>
            </div>
        </form>
    );
};

export default SecurityVerificationForm;
