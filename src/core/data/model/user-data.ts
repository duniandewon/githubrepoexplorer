interface User {
    login: string;
    id: number;
    avatar_url: string;
    repos_url: string;
}
export interface UserData {
    total_count: number
    incomplete_results: boolean,
    items: User[]
}