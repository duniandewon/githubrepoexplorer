import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { describe, it, expect, vi } from 'vitest'

import { Button } from '../button'

describe('Button', () => {
    it("renders correctly with default props", () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-primary text-primary-foreground");
    });

    it("supports different variants", () => {
        render(<Button variant="destructive">Delete</Button>);
        const button = screen.getByRole("button", { name: /delete/i });
        expect(button).toHaveClass("bg-destructive text-white");
    });

    it("supports different sizes", () => {
        render(<Button size="lg">Large Button</Button>);
        const button = screen.getByRole("button", { name: /large button/i });
        expect(button).toHaveClass("h-10 rounded-md px-6");
    });

    it("calls onClick handler when clicked", async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        const button = screen.getByRole("button", { name: /click me/i });
        await userEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("is disabled when the disabled prop is passed", async () => {
        const handleClick = vi.fn();
        render(
            <Button onClick={handleClick} disabled>
                Disabled Button
            </Button>
        );
        const button = screen.getByRole("button", { name: /disabled button/i });
        expect(button).toBeDisabled();
        await userEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });
})