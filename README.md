# Test automation using playwright framework

The code runs the following automated tests for amazon.com:
*  Check the correct website is open
*  Can search for "Nikon"
*  Can sort "Nikon" search results from highest to lowest price
*  Can select the second product where the product title containd D6 -> under review

After cloning the repo run
`npm install`
to install dependencies.

To run amazon related tests, go to the folder tests and run the following command:
`npx playwright test amazon.spec.ts`

If you want to watch the browser as the tests are run, you can run the command:
`npx playwright test amazon.spec.ts --headed`

The tests are run parallel. So if you use this command the browser windows for all tests open at the same time.