export interface Repository {
    id: number
    title: string
    description: string
    star: number
}

export interface User {
    id: number
    username: string
    repositories: Repository[]
}