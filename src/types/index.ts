export interface Repository {
    id: string
    title: string
    description: string
    star: number
}

export interface User {
    id: string
    username: string
    repositories: Repository[]
}