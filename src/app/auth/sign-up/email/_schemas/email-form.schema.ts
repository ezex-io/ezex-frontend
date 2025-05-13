import { z } from "zod";

export const emailFormSchema = z.object({
    email: z.string().email({
        message: "please enter a valid email address",
    }),
});

export type EmailFormValues = z.infer<typeof emailFormSchema>;
