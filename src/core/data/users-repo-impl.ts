import { AxiosInstance } from 'axios';

import { UserData } from "@/core/data/model/user-data";

import { UsersRepository } from "@/core/data/users-repo";

import { httpClient } from "@/lib/axios";
import { GitRepoData } from './model/git-repo-data';

export function UsersRepoImpl(client: AxiosInstance = httpClient): UsersRepository {
    const getUsers = async (search: string): Promise<UserData> => {
        const res = await client.get<UserData>(`/search/users?per_page=5&q=${search}`)

        return res.data
    }

    const getGitRepo = async (owner: string): Promise<GitRepoData[]> => {
        const res = await client.get<GitRepoData[]>(`users/${owner}/repos?per_page=10`)

        return res.data
    }

    return {
        getUsers,
        getGitRepo
    }
}