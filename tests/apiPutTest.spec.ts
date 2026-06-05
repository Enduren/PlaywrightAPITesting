import { test, expect, request, APIRequestContext } from '@playwright/test';


test.describe('API PUT Requests', () => {

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