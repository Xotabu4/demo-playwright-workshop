import { request } from "@playwright/test"

// fetch("https://shopdemo-alex-hot.koyeb.app/api/auth/register", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     // "accept-language": "uk,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6",
//     // "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmJiYmNlMjJlMzg2NDlmYzM5YTc2NSIsImlhdCI6MTY5MjUzMDY4NiwiZXhwIjoxNjkzMTM1NDg2fQ.Lw8GJoODN5z2ZgLdwaFiU9ofpapywKvm4HlIDSlQYqw",
//     // "cache-control": "no-cache",
//     "content-type": "application/json;charset=UTF-8",
//     // "pragma": "no-cache",
//     // "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
//     // "sec-ch-ua-mobile": "?0",
//     // "sec-ch-ua-platform": "\"macOS\"",
//     // "sec-fetch-dest": "empty",
//     // "sec-fetch-mode": "cors",
//     // "sec-fetch-site": "same-origin"
//   },
//   // "referrerPolicy": "no-referrer",
//   "body": "{\"isSubscribed\":false,\"email\":\"xotabu4@gmail.com\",\"firstName\":\"test\",\"lastName\":\"test\",\"password\":\"xotabu4@gmail.com\"}",
//   "method": "POST"
// });

// {
//     "success": true,
//     "subscribed": false,
//     "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWExM2QxOGUwMTI2MDAyMWVhNDg0NSIsImlhdCI6MTY5MzA2MjA5OCwiZXhwIjoxNjkzNjY2ODk4fQ.0tyb4PgEN4KPbDjgVD4y2w7_XTaLp2bPW4PcEezUAlI",
//     "user": {
//         "id": "64ea13d18e01260021ea4845",
//         "firstName": "test",
//         "lastName": "test",
//         "email": "test+1231892389@test.com",
//         "role": "ROLE MEMBER"
//     }
// }

export interface UserCreatedResponse {
    success: boolean
    subscribed: boolean
    token: string
    user: {
        id: string
        firstName: string
        lastName: string
        email: string
        role: string
    }
}

export interface UserCreateRequest {
    isSubscribed: boolean
    email: string
    firstName: string
    lastName: string
    password: string
}

export class API {
    async createNewUser(data: UserCreateRequest): Promise<UserCreatedResponse> {
        const req = await request.newContext();
        const resp = await req.post('https://shopdemo-alex-hot.koyeb.app/api/auth/register', {
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
            },
            // data: {
            //     isSubscribed: false,
            //     email: "xotabu4@gmail.com",
            //     firstName: "test",
            //     lastName: "test",
            //     password: "xotabu4@gmail.com"
            // },
            data
        })

        return resp.json() as Promise<UserCreatedResponse>
    }
}