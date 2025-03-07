import { UsersRepository } from "@/core/data/users-repo";
import { UsersRepoImpl } from "@/core/data/users-repo-impl";

import { User } from "@/core/domain/model/User";
import { GitRepo } from "@/core/domain/model/GitRepo";

import { UsersUseCase } from "./users-usecase";

export function UsersInteractors(repo: UsersRepository = UsersRepoImpl()): UsersUseCase {
    const getUsers = async (search: string): Promise<User[]> => {
        const users = await repo.getUsers(search)

        return users.items.map(user => ({
            avatar: user.avatar_url,
            id: user.id,
            name: user.login
        }))
    }

    const getGitRepo = async (owner: string): Promise<GitRepo[]> => {
        const gitRepos = await repo.getGitRepo(owner)

        return gitRepos.map(gitRepo => ({
            description: gitRepo.description || "",
            id: gitRepo.id,
            name: gitRepo.name,
            star: gitRepo.stargazers_count
        }))
    }

    return {
        getUsers,
        getGitRepo
    }
}