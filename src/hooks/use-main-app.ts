import { useState } from "react";
import { UsersInteractors } from "@/core/domain/usecase/users-interactor";
import { UsersUseCase } from "@/core/domain/usecase/users-usecase";

import { Repository, User } from "@/types";

export function useMainApp(usersUsecase: UsersUseCase = UsersInteractors()) {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchGithubUsers = async (search: string) => {
        try {
            setIsLoading(true)
            setUsers([])
            const githubUsers = await usersUsecase.getUsers(search);

            const mappedUsers: User[] = await Promise.all(
                githubUsers.map(async (user) => {
                    const userRepos = await usersUsecase.getGitRepo(user.name);

                    const mappedRepo: Repository[] = userRepos.map(repo => ({
                        description: repo.description,
                        id: repo.id,
                        star: repo.star,
                        title: repo.name
                    }))

                    return {
                        id: user.id,
                        repositories: mappedRepo,
                        username: user.name,
                    };
                })
            );

            setUsers(mappedUsers);
        } catch (userError) {
            console.error("Error fetching users:", userError);
            setUsers([]);
        } finally {
            setIsLoading(false)
        }
    };

    return { users, isLoading, fetchGithubUsers }
}