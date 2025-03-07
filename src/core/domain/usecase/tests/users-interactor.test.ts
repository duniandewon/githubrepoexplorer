import { describe, expect, it, vi } from "vitest";

import { UsersRepository } from "@/core/data/users-repo";
import { UsersInteractors } from "../users-interactor";
import { UsersUseCase } from "../users-usecase";

const mockUsers = [
    { id: 1, avatar_url: "avatar1.jpg", login: "Alice" },
    { id: 2, avatar_url: "avatar2.jpg", login: "Bob" },
];

const mockRepo: UsersRepository = {
    getUsers: vi.fn().mockResolvedValue({ items: mockUsers }),
};

describe("UsersInteractors", () => {
    it("should fetch and transform users correctly", async () => {
        const useCase: UsersUseCase = UsersInteractors(mockRepo);
        const result = await useCase.getUsers("Alice");

        expect(mockRepo.getUsers).toHaveBeenCalledWith("Alice");
        expect(result).toEqual([
            { id: 1, avatar: "avatar1.jpg", name: "Alice" },
            { id: 2, avatar: "avatar2.jpg", name: "Bob" },
        ]);
    });

    it("should return an empty array if no users are found", async () => {
        mockRepo.getUsers = vi.fn().mockResolvedValue({ items: [] });

        const useCase: UsersUseCase = UsersInteractors(mockRepo);
        const result = await useCase.getUsers("Unknown");

        expect(result).toEqual([]);
    });
});