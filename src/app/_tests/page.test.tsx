import HomePage from "@/app/page";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("Page", () => {
    render(<HomePage />);
    expect(screen.getByTestId("title")).toBeDefined();
});
