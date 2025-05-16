import { gql } from "graphql-request";
import { gqlRequest, GQLRequestOptions } from "../client";

export const SEND_CONFIRMATION_CODE = gql`
    mutation SendConfirmationCode($input: SendConfirmationCodeInput!) {
        sendConfirmationCode(input: $input) {
            recipient
        }
    }
`;

export enum DeliveryMethod {
    EMAIL = "EMAIL",
}

export interface SendConfirmationCodeAPIBody extends GQLRequestOptions {
    method: DeliveryMethod;
    recipient: string;
}

export const sendConfirmationCodeAPI = async (
    body: SendConfirmationCodeAPIBody,
) => {
    return await gqlRequest(SEND_CONFIRMATION_CODE, {
        input: {
            method: body.method,
            recipient: body.recipient,
        },
    });
};
