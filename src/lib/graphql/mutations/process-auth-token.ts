import { gql } from "graphql-request";
import { gqlRequest, GQLRequestOptions } from "../client";

export const PROCESS_AUTH_TOKEN = gql`
    mutation ProcessAuthToken($input: ProcessAuthTokenInput!) {
        processAuthToken(input: $input) {
            user_id
        }
    }
`;

export interface ProcessAuthTokenAPIBody extends GQLRequestOptions {
    id_token: string;
}

export const processAuthTokenAPI = async (
    body: ProcessAuthTokenAPIBody,
) => {
    return await gqlRequest(PROCESS_AUTH_TOKEN, {
        input: {
            id_token: body.id_token,
        },
    });
};
