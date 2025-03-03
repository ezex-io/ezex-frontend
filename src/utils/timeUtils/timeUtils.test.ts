import { describe, expect, test } from "vitest";
import { minutes, seconds } from "./timeUtils";

describe("timeUtils", () => {
    test("seconds should convert seconds to milliseconds", () => {
        expect(seconds(1)).toBe(1000);
        expect(seconds(0)).toBe(0);
        expect(seconds(2.5)).toBe(2500);
        expect(seconds(-1)).toBe(-1000);
    });

    test("minutes should convert minutes to milliseconds", () => {
        expect(minutes(1)).toBe(60000);
        expect(minutes(0)).toBe(0);
        expect(minutes(2.5)).toBe(150000);
        expect(minutes(-1)).toBe(-60000);
    });
});
