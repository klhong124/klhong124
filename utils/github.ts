import { Octokit } from '@octokit/rest'

const GITHUB_USERNAME = 'klhong124'

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

export default async () => {
    const { data: reposData } = await octokit.request('GET /users/{username}/repos', {
        username: GITHUB_USERNAME
    })

    const { data: followersData } = await octokit.request('GET /users/{username}/followers', {
        username: GITHUB_USERNAME
    })

    const stars:number = reposData.map(repo => repo.stargazers_count ?? 0).reduce((acc: number, curr: number) => acc + curr, 0)
    const repos:number = reposData.length
    const followers:number = followersData.length

    return { stars, repos, followers }
}
