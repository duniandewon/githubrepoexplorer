import { User } from "@/core/domain/model/User";
import { GitRepo } from "@/core/domain/model/GitRepo";

export interface UsersUseCase {
    getUsers(search: string): Promise<User[]>
    getGitRepo(owner: string): Promise<GitRepo[]>
}