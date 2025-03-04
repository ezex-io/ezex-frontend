/**
 * Ensures the given value is a string. If the value is `null` or `undefined`,
 * it returns an empty string.
 *
 * @param {string | null | undefined} value - The input value to normalize.
 * @returns {string} The original string or an empty string if the value is nullish or undefined.
 */
export const toSafeString = (value: string | null | undefined): string => {
    return typeof value !== "string" ? "" : value;
};
