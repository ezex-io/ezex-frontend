import { passwordSchema } from "@/lib/schemas/password.schema";
import { z } from "zod";

export const passwordFormSchema = z.object({
    itIsMe: z.boolean({
        required_error: "please verify it is your selected image during signup",
    }),
    password: passwordSchema,
});

export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
