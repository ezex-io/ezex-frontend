import { passwordSchema } from "@/lib/schemas/password.schema";
import { z } from "zod";

export const passwordFormSchema = z
    .object({
        imageId: z.number({
            required_error: "Please select a security image.",
            invalid_type_error: "Please select a security image.",
        }),
        password: passwordSchema,
        confirmPassword: z.string({
            required_error: "Please enter confirm password",
            invalid_type_error: "Please enter confirm password",
        }),
    })
    .refine(
        data => {
            return data.password === data.confirmPassword;
        },
        {
            message: "Passwords must match.",
            path: ["confirmPassword"],
        },
    );

export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
