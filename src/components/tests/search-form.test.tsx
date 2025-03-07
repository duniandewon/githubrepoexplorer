import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchForm } from "@/components/search-form";

describe("SearchForm", () => {
    it("renders the search input and submit button", () => {
        const mockOnSubmit = vi.fn();
        render(<SearchForm onSubmit={mockOnSubmit} />);

        const input = screen.getByPlaceholderText("Enter username");
        const button = screen.getByRole("button", { name: /search/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })

    it("displays an error message when input is less than 3 characters", async () => {
        const mockOnSubmit = vi.fn();
        render(<SearchForm onSubmit={mockOnSubmit} />);

        const input = screen.getByPlaceholderText("Enter username");
        const button = screen.getByRole("button", { name: /search/i });

        await userEvent.type(input, "ab");
        await userEvent.click(button);

        expect(await screen.findByText("Search must be at least 3 characters long")).toBeInTheDocument();
    })

    it("clears the input field after submission", async () => {
        const mockOnSubmit = vi.fn();
        render(<SearchForm onSubmit={mockOnSubmit} />);

        const input = screen.getByPlaceholderText("Enter username");
        const button = screen.getByRole("button", { name: /search/i });

        await userEvent.type(input, "validname");
        await userEvent.click(button);

        expect(input).toHaveValue("");
    });

    it("calls onSubmit with valid input", async () => {
        const mockOnSubmit = vi.fn();
        render(<SearchForm onSubmit={mockOnSubmit} />);

        const input = screen.getByPlaceholderText("Enter username");
        const button = screen.getByRole("button", { name: /search/i });

        await userEvent.type(input, "validname");
        await userEvent.click(button);


        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({ search: "validname" });
    });
})