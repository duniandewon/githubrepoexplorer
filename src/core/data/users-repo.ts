import { UserData } from "@/core/data/model/user-data"
import { GitRepoData } from "./model/git-repo-data"

export interface UsersRepository {
    getUsers(search: string): Promise<UserData>
    getGitRepo(owner: string): Promise<GitRepoData[]>
}