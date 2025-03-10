import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter"; // Adjust the import path as needed

describe("useCounter", () => {
    test("should initialize with the correct initial value", () => {
        const { result } = renderHook(() => useCounter(10));
        expect(result.current.count).toBe(10);
    });

    test("should initialize with 0 if no initial value is provided", () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.count).toBe(0);
    });

    test("should increment the count", () => {
        const { result } = renderHook(() => useCounter(5));
        act(() => {
            result.current.increment();
        });
        expect(result.current.count).toBe(6);
    });

    test("should decrement the count", () => {
        const { result } = renderHook(() => useCounter(5));
        act(() => {
            result.current.decrement();
        });
        expect(result.current.count).toBe(4);
    });

    test("should reset the count to the initial value", () => {
        const { result } = renderHook(() => useCounter(5));
        act(() => {
            result.current.increment();
            result.current.increment();
            result.current.reset();
        });
        expect(result.current.count).toBe(5);
    });

    test("should reset the count to 0 if no initial value was provided", () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
            result.current.increment();
            result.current.increment();
            result.current.reset();
        });
        expect(result.current.count).toBe(0);
    });

    test("should allow setting the count directly", () => {
        const { result } = renderHook(() => useCounter(5));
        act(() => {
            result.current.setCount(20);
        });
        expect(result.current.count).toBe(20);
    });

    test("should allow setting the count using a function", () => {
        const { result } = renderHook(() => useCounter(5));
        act(() => {
            result.current.setCount(prev => prev + 10);
        });
        expect(result.current.count).toBe(15);
    });
});
