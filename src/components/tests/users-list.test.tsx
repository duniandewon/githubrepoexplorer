import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { User } from "@/types";

import { UsersList } from "@/components/users-list";
import userEvent from "@testing-library/user-event";

const mockUsers: User[] = [
    {
        id: "1",
        username: "user1",
        repositories: [
            { id: "repo1", title: "Repo One", description: "Repo one description", star: 2 },
            { id: "repo2", title: "Repo Two", description: "Repo two description", star: 2 },
        ],
    },
    {
        id: "2",
        username: "user2",
        repositories: [{ id: "repo3", title: "Repo Three", description: "Repo three description", star: 54 }],
    },
];

describe("UsersList", () => {
    it("renders users correctly", () => {
        render(<UsersList users={mockUsers} />);
        expect(screen.getByText("user1")).toBeInTheDocument();
        expect(screen.getByText("user2")).toBeInTheDocument();
    })

    it("renders correct number of AccordionItems", () => {
        render(<UsersList users={mockUsers} />);

        const accordionItems = screen.getAllByRole("button", { name: /user/i });
        expect(accordionItems).toHaveLength(mockUsers.length);
    });


    it("renders repositories inside the accordion", async () => {
        render(<UsersList users={mockUsers} />);

        expect(screen.queryByText("Repo One")).not.toBeInTheDocument();
        expect(screen.queryByText("Repo Two")).not.toBeInTheDocument();

        const accordionItem = screen.getByRole("button", { name: /user1/i });

        await userEvent.click(accordionItem)

        expect(screen.getByText("Repo One")).toBeInTheDocument();
        expect(screen.getByText("Repo two description")).toBeInTheDocument();
    });

    it("toggles accordion open and close on click", async () => {
        render(<UsersList users={mockUsers} />);
        const user1Trigger = screen.getByText("user1");

        await userEvent.click(user1Trigger);
        expect(screen.getByText("Repo One")).toBeInTheDocument();

        await userEvent.click(user1Trigger);
        expect(screen.queryByText("Repo One")).not.toBeInTheDocument();
    });
})