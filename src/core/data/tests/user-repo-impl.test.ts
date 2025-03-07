import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

import { UsersRepoImpl } from "@/core/data/users-repo-impl";
import { httpClient } from "@/lib/axios";

const mockUsers = {
    incomplete_results: false,
    items: [
        {
            avatar_url: "https://avatars.githubusercontent.com/u/2123321?v=4",
            id: 234,
            name: "A Name",
            repos_url: "https://api.github.com/users/username/repos",
        }
    ],
    total_count: 1
}

const restHandlers = [
    http.get("https://api.github.com/search/users", ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q');
        if (query === 'duniandewon') {
            return HttpResponse.json(mockUsers);
        }
        return HttpResponse.json({ incomplete_results: false, items: [], total_count: 0 });
    }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("UsersRepoImpl", () => {
    it("should fetch users successfully", async () => {
        const usersRepo = UsersRepoImpl(httpClient);
        const users = await usersRepo.getUsers("duniandewon");

        console.log("user:", users)

        expect(users.items).toHaveLength(1);
        expect(users.items[0]).toEqual(mockUsers.items[0]);
    });

    it("should return an empty array when no users match", async () => {
        const usersRepo = UsersRepoImpl(httpClient);
        const users = await usersRepo.getUsers("unknown");

        expect(users.items).toHaveLength(0);
    });

    it("should handle errors correctly", async () => {
        server.use(
            http.get("https://api.github.com/search/users", () =>
                HttpResponse.error()
            )
        );

        const usersRepo = UsersRepoImpl(httpClient);

        await expect(usersRepo.getUsers("error")).rejects.toThrow();
    });
});
