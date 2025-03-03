import { z } from "zod";

// Define the schema
const clientEnvSchema = z.object({
    NEXT_PUBLIC_GATEWAY_API_BASE_URL: z
        .string()
        .url("NEXT_PUBLIC_GATEWAY_API_BASE_URL must be a valid URL"),
});

const parseAndValidateEnvSchema = (schema: z.AnyZodObject) => {
    // Parse and validate client envs
    const parsed = schema.safeParse(process.env);
    if (!parsed.success) {
        console.error(
            "❌ Invalid environment variables:",
            parsed.error.format(),
        );

        process.exit(1); // Stop build or app execution
    }

    return parsed.data;
};

export const CLIENT_ENV = parseAndValidateEnvSchema(clientEnvSchema);
