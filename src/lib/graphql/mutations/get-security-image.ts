import { gql } from "graphql-request";
import { gqlRequest, GQLRequestOptions } from "../client";

export interface SecurityImageResponse {
    getSecurityImage: {
        email: string;
        security_image: string;
        security_phrase: string;
    };
}

export const GET_SECURITY_IMAGE = gql`
    mutation GetSecurityImage($input: GetSecurityImageInput!) {
        getSecurityImage(input: $input) {
            email
            security_image
            security_phrase
        }
    }
`;

export interface GetSecurityImageAPIBody extends GQLRequestOptions {
    email: string;
}

export const getSecurityImageAPI = async (
    body: GetSecurityImageAPIBody,
): Promise<SecurityImageResponse> => {
    return await gqlRequest(GET_SECURITY_IMAGE, {
        input: {
            email: body.email,
        },
    });
};
