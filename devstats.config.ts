
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_PAT = process.env.GITHUB_PAT;

const STACKOVERFLOW_USER_ID = process.env.STACKOVERFLOW_USER_ID;
const CODEWARS_USERNAME= process.env.CODEWARS_USERNAME;

export default {
    github: {
        username: GITHUB_USERNAME,
        token: GITHUB_PAT
    },
    stackoverflow: {
        user_id: STACKOVERFLOW_USER_ID
    },
    codewars: {
        username: CODEWARS_USERNAME
    }
}