import { randomUUID } from 'node:crypto';
import { test } from "@playwright/test"
import { setTimeout } from 'node:timers/promises';

const createNewUser = async () => {
    const userModel = {
        isSubscribed: false,
        email: `test+${randomUUID()}@test.com`,
        firstName: "test",
        lastName: "test",
        password: "xotabu4@gmail.com"
    };    
    await setTimeout(1000);

    return userModel;
}

test('100 users registration sync', async () => {
    const users = [];
    for (let i=0; i <100; i++) {
        console.log(i);
        users.push(await createNewUser())
    }
    console.table(users)
})

test('100 users registration async', async () => {
    const usersPromises = [];
    for (let i=0; i <100; i++) {
        console.log(i);
        usersPromises.push(createNewUser())
    }
    const users = await Promise.all(usersPromises)
    console.table(users)
})
