import { test, expect, request, APIRequestContext } from '@playwright/test';


test.describe('API POST Requests', () => {
    let reqContext: APIRequestContext; 
    
    test.beforeAll(async () => {
        // 2. make url comon for all the tests
        reqContext = await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com',
            extraHTTPHeaders: {
                'Accept': 'application/json',
            },
        });
    });

    // 3. Clean up the context after all tests finish
    test.afterAll(async () => {
        await reqContext.dispose();
    });


    



});