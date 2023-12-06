/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { test, mergeTests } from '@playwright/test';

const doxymeTest = test.extend({
    doctor: async ({ }, use) => {
        console.log('doctor fixture executed')
        await use({ name: 'Dr. House' });
    },
    proDoctor: async ({ }, use) => {
        console.log('doctor fixture executed')
        await use({ name: 'PRO Dr. House' });
    },
    clinicOwner: async ({ }, use) => {
        console.log('doctor fixture executed')
        await use({ name: 'CLINIC OWNER Dr. House' });
    },
    patient1: async ({ }, use) => {
        console.log('patient1 fixture executed')
        await use({ name: 'patient1' });
    },
    patient2: async ({ }, use) => {
        console.log('patient2 fixture executed')
        await use({ name: 'patient2' });
    },
    patient3: async ({ }, use) => {
        console.log('patient3 fixture executed')
        await use({ name: 'patient3' });
    },
});

mergeTests([
    doxymeTest, 
    test.extend({
    doctor: async ({ }, use) => {
        console.log('doctor fixture executed')
        await use({ name: 'Dr. House' });
    },
])

doxymeTest('test', ({ doctor }) => {
    console.log(doctor.name)
})