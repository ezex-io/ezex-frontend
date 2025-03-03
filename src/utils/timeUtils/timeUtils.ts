/**
 * Converts seconds to milliseconds.
 * @param {number} seconds - The number of seconds.
 * @returns {number} The equivalent time in milliseconds.
 */
export const seconds = (seconds: number): number => seconds * 1000;

/**
 * Converts minutes to milliseconds.
 * @param {number} minutes - The number of minutes.
 * @returns {number} The equivalent time in milliseconds.
 */
export const minutes = (minutes: number): number => minutes * 60 * 1000;
