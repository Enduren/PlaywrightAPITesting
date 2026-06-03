import { test, expect, request, APIRequestContext } from '@playwright/test';

test.describe('API DELETE Requests', () => {
    test('Uses the baseURL from the config file', async ({ request }) => {
        const response = await request.delete('/booking/3');
        console.log(await response.text());
        expect(response.status()).toBe(201); // The API returns 201 for successful deletion
        expect(response.ok()).toBeTruthy();
        const responseText= await response.text();
        expect(responseText).toEqual('Created'); // The API returns an empty body for successful deletion

        // Verify that the resource has been deleted by attempting to retrieve it
        const getResponse = await request.get('/booking/3');
        expect(getResponse.status()).toBe(404); // The API should return 404 for a deleted resource

    });
});