import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

import { httpClient } from "../axios";

const users = [
    {
        avatar_url: "https://avatars.githubusercontent.com/u/2123321?v=4",
        followers: 2,
        following: 4,
        id: 234,
        name: "A Name",
        repos_url: "https://api.github.com/users/username/repos",
    }
]

const restHandlers = [
    http.get("https://api.github.com/search/users", ({ request }) => {
        const url = new URL(request.url)
        
        const query = url.searchParams.get('q');
        if (query === 'duniandewon') {
            return HttpResponse.json({ items: users });
        }
        return HttpResponse.json({ items: [] });
    }),
    http.get("https://api.github.com/users/testuser", () => {
        return HttpResponse.json({
            id: 1,
            name: "Test User",
            avatar_url: "https://example.com/avatar.jpg",
        });
    }),
    http.get("https://api.github.com/users/unknown", () => {
        return new HttpResponse(JSON.stringify({ message: "User not found" }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    })
];

const server = setupServer(...restHandlers)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("httpClient", () => {
    it("should make a GET request successfully", async () => {
        const response = await httpClient.get("/users/testuser");

        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            id: 1,
            name: "Test User",
            avatar_url: "https://example.com/avatar.jpg",
        });
    });

    it("should handle a 404 error correctly", async () => {
        await expect(httpClient.get("/users/unknown")).rejects.toThrowError(/Request failed with status code 404/);
    });

    it("should call response interceptor", async () => {
        const responseInterceptorMock = vi.fn();
        const interceptorId = httpClient.interceptors.response.use((response) => {
            responseInterceptorMock();
            return response;
        });

        await httpClient.get("/users/testuser");

        expect(responseInterceptorMock).toHaveBeenCalled();

        httpClient.interceptors.response.eject(interceptorId);
    });
});
