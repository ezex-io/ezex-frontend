import { toSafeString } from "@/utils/stringUtils/stringUtils";
import { GraphQLClient, RequestDocument, ClientError } from "graphql-request";

const GQL_BASE_URL = `${toSafeString(process.env.NEXT_PUBLIC_GATEWAY_API_BASE_URL)}${"/query"}`;
const gqlClient = new GraphQLClient(GQL_BASE_URL);

export interface GQLRequestOptions {
    disableToast?: boolean;
}

export async function gqlRequest<T = unknown>(
    document: RequestDocument,
    variables?: object,
    options?: GQLRequestOptions,
): Promise<T> {
    try {
        return await gqlClient.request<T>(document, variables);
    } catch (error) {
        // [DOC]: Always rethrow so caller can still handle or check manually
        if (options?.disableToast) throw error;

        if (error instanceof ClientError) {
            const gqlError = error.response.errors;

            if (gqlError && gqlError.length !== 0) {

                throw error;
            }
        }
        throw error;
    }
}

export default gqlClient;
