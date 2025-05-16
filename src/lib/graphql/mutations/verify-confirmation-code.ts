import { gql } from "graphql-request";
import { gqlRequest, GQLRequestOptions } from "../client";

export const VERIFY_CONFIRMATION_CODE = gql`
    mutation VerifyConfirmationCode($input: VerifyConfirmationCodeInput!) {
        verifyConfirmationCode(input: $input) {
            recipient
        }
    }
`;

export interface VerifyConfirmationCodeAPIBody extends GQLRequestOptions {
    code: string;
    recipient: string;
}

export const verifyConfirmationCodeAPI = async (
    body: VerifyConfirmationCodeAPIBody,
) => {
    return await gqlRequest(VERIFY_CONFIRMATION_CODE, {
        input: {
            code: body.code,
            recipient: body.recipient,
        }
    },);
};
