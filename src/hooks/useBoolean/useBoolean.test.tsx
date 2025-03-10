import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useBoolean } from "./useBoolean";

describe("useBoolean", () => {
    test("should initialize with default value", () => {
        const { result } = renderHook(() => useBoolean(true));
        expect(result.current.value).toBe(true);
    });

    test("should set value to true", () => {
        const { result } = renderHook(() => useBoolean(false));
        act(() => {
            result.current.setTrue();
        });
        expect(result.current.value).toBe(true);
    });

    test("should set value to false", () => {
        const { result } = renderHook(() => useBoolean(true));
        act(() => {
            result.current.setFalse();
        });
        expect(result.current.value).toBe(false);
    });

    test("should toggle value", () => {
        const { result } = renderHook(() => useBoolean(true));

        act(() => {
            result.current.toggle();
        });
        expect(result.current.value).toBe(false);

        act(() => {
            result.current.toggle();
        });
        expect(result.current.value).toBe(true);
    });

    test("should update value using setValue function", () => {
        const { result } = renderHook(() => useBoolean(false));
        act(() => {
            result.current.setValue(true);
        });
        expect(result.current.value).toBe(true);
    });

    test("should throw error if defaultValue is not boolean", () => {
        expect(() =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            renderHook(() => useBoolean("invalid" as any)),
        ).toThrowError();
    });
});
