import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Repository } from "@/components/repository";

describe("Repository", () => {
    const repo = { id: 3, title: "Repo One", description: "Repo one description", star: 2 }
    it("renders correctly", () => {
        render(<Repository repo={repo} />)

        expect(screen.getByText("Repo One")).toBeInTheDocument()
    })
})