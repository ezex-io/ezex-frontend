import { z } from "zod";

export const passwordSchema = z
    .string({
        required_error: "Please enter password",
        invalid_type_error: "Please enter password",
    })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
    })
    .regex(/[!@#$%^&*]/, {
        message:
            "Password must contain at least one special character: !@#$%^&*",
    });
