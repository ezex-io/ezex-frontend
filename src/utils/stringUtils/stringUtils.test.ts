import { describe, expect, test } from "vitest";
import { toSafeString } from "./stringUtils";

describe("toSafeString", () => {
    test("returns the same string when given a string", () => {
        expect(toSafeString("hello")).toBe("hello");
    });

    test("returns an empty string when given null", () => {
        expect(toSafeString(null)).toBe("");
    });

    test("returns an empty string when given undefined", () => {
        expect(toSafeString(undefined)).toBe("");
    });

    test("returns an empty string when given an empty string", () => {
        expect(toSafeString("")).toBe("");
    });
});
