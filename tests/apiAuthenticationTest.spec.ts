import { test, expect } from '@playwright/test';

test.describe('API Authentication Requests', () => {
    let authToken: string;

    test.beforeAll('Uses the baseURL from the config file', async ({ request }) => {
        const response = await request.post('/auth', {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        expect(response.ok()).toBeTruthy();
        
        // Parse the body once so you can use it safely multiple times
        const resBody = await response.json();
        console.log(resBody);
        
        expect(resBody).toHaveProperty('token'); 

        // Correctly save the token inside the hook where 'resBody' is defined
        authToken = resBody.token; 
    }); 

    test('Uses the token from the previous test', async ({ request }) => {
        // Ensure we actually have a token before proceeding
        expect(authToken).toBeDefined();

        const response = await request.put('/booking/1', {
            headers: {
                Cookie: `token=${authToken}` 
            },
            data: {
                firstname: 'QAutomation',
                lastname: 'Playwright1',
                totalprice: 555,
                depositpaid: true,
                bookingdates: {
                    checkin: '2024-01-01',
                    checkout: '2024-01-10'
                },
                additionalneeds: 'Breakfast'
            }
        }); 

        const resBody = await response.json();
        console.log(resBody);
        
        expect(response.ok()).toBeTruthy();
        expect(resBody).toMatchObject({
            firstname: 'QAutomation',
            lastname: 'Playwright1',
            totalprice: 555,
            depositpaid: true,
            bookingdates: {
                checkin: '2024-01-01',
                checkout: '2024-01-10'
            },
            additionalneeds: 'Breakfast'
        });
    });
}); // Properly closed the describe block here at the very end