import { test, expect, request, APIRequestContext } from '@playwright/test';


test.describe('API PUT Requests', () => {
    let reqContext: APIRequestContext; 
    
    // test.beforeAll(async () => {
    //     // 2. make url comon for all the tests
    //     reqContext = await request.newContext({
    //         baseURL: 'https://restful-booker.herokuapp.com',
    //         extraHTTPHeaders: {
    //             'Accept': 'application/json',
    //             'Cookie': 'token=abc123',
    //         },
    //     });
    // });

    // // 3. Clean up the context after all tests finish
    // test.afterAll(async () => {
    //     await reqContext.dispose();
    // });


    test('Uses the baseURL from the config file', async ({ request }) => {
        const response = await request.put('/booking/1', {
            headers:{
                Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=' // Base64 encoded 'tenn:tenn'
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
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(await response.json()).toMatchObject( {
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
            );
    });
    



});