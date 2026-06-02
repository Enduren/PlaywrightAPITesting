import { test, expect, request, APIRequestContext } from '@playwright/test';


test.describe('API POST Requests', () => {
    test('Uses the baseURL from the config file', async ({ request }) => {
        const response = await request.post('/booking', {
            
            data: {
                firstname: 'Jim',
                lastname: 'Brown',
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                    checkin: '2018-01-01',
                    checkout: '2019-01-10'
                },
                additionalneeds: 'Breakfast'
            }
        });
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
      
    });


});