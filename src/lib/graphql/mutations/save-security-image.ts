import { gql } from "graphql-request";
import { gqlRequest, GQLRequestOptions } from "../client";

export const SAVE_SECURITY_IMAGE = gql`
    mutation SaveSecurityImage($input: SaveSecurityImageInput!) {
        saveSecurityImage(input: $input) {
            email
        }
    }
`;

export interface SaveSecurityImageAPIBody extends GQLRequestOptions {
    email: string;
    security_image: string;
    security_phrase: string;
}

export const saveSecurityImageAPI = async (
    body: SaveSecurityImageAPIBody,
) => {
    return await gqlRequest(SAVE_SECURITY_IMAGE, {
        input: {
            email: body.email,
            security_image: body.security_image,
            security_phrase: body.security_phrase,
        },
    });
};
