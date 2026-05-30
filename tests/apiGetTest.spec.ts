import { test, expect, request, APIRequestContext } from '@playwright/test';

// 1. Declare the context globally so all tests can see it, and give it a type
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

// Test 1: Uses Playwright's built-in global 'request' fixture
//! if it different http method use this
test('get request part 2', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking',
        {
            headers:{
            'Accept': 'application/json',
            },
        }
    );
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
});

// Test 2: Creating an isolated context inline
//! if you want to make the baseurl common for all the calls use this
test('use newContext get request', async () => {
    const registrationContext = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
            'Accept': 'application/json',
        },
    });
    const response = await registrationContext.get('/booking');
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    
    // Always dispose of manually created contexts to avoid memory leaks
    await registrationContext.dispose();
});

// Test 3: Uses the context shared from beforeAll
//! make url comon for all the tests
test('beforeAll to get request part 2', async () => {
    // Removed the empty object ({ }) from the argument since we are using the global reqContext
    const response = await reqContext.get('/booking');
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
});

// Test 4: Uses the baseURL from the config file, so we can just specify the endpoint
//! if you want to make the url global use this
test('Uses the baseURL from the config file', async ({ request }) => {
    const response = await request.get('/booking');
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
});

test('Uses the baseURL from the config file for id', async ({ request }) => {
    const response = await request.get('/booking/1');
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
});

test('Uses the baseURL from the config file for using params', async ({ request }) => {
    const response = await request.get('/booking',
        {
            params:{
                'firstname': 'John',
                'lastname': 'Smith'
            }
        }
    );
    console.log(await response.json());
    expect(response.status()).toBe(200);
});

test('Uses the baseURL from the config file for id pt2', async ({ request }) => {
    const response = await request.get('/booking/14');
    console.log(await response.json());
     expect(await response.json()).toMatchObject({
         'firstname': 'John',
         'lastname': 'Smith',
         "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
    })
});