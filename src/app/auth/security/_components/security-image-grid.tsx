"use client";

import {
    VERIFICATION_IMAGES,
    VerificationImage,
} from "@/app/auth/security/_constants/verification-images";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { FC } from "react";

interface SecurityImageGridProps {
    selectedImage: number | null;
    onImageSelect: (imageId: number) => void;
}

const SecurityImageGrid: FC<SecurityImageGridProps> = ({
    selectedImage,
    onImageSelect,
}) => {
    return (
        <div className="mb-6 grid grid-cols-4 gap-2 md:gap-4">
            {VERIFICATION_IMAGES.map((image: VerificationImage) => {
                const isSelected = selectedImage === image.id;

                return (
                    <button
                        key={image.id}
                        type="button"
                        onClick={() => onImageSelect(image.id)}
                        className={cn(
                            "group relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300",
                            isSelected
                                ? "border-primary-500 ring-primary-300/50 ring-4"
                                : "border-gray-700 hover:border-gray-500",
                        )}
                        aria-label={`Select ${image.name} image`}
                        aria-pressed={isSelected}
                    >
                        <Image
                            src={image.path}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        {isSelected && (
                            <div
                                className="bg-primary-500 absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full text-white"
                                aria-hidden="true"
                            >
                                ✓
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default SecurityImageGrid;
