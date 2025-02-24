import { test, expect } from '@playwright/test';

// Runs tests in parallel, however this lead to amazon sometimes opening incorrectly
test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // While running tests parallel the page sometimes opened differently, this was fixed by reloading the page once
    await page.reload();
  });


test.describe('in amazon.com', () => {
    test('the website opens correctly', async ({ page }) => {
        // Check the webpage has Amazon logo-link
        await expect(page.getByRole('link', {name: 'Amazon'}).first()).toBeVisible();
        });
    
    test.describe('"Nikon" search', () => {
        test('gets results', async ({ page }) => {
            // Input "Nikon" into searchbox
            await page.getByRole('searchbox', {name: 'Search Amazon'}).fill('Nikon');
    
            // Click search
            await page.getByRole('button', {name: 'GO'}).first().click();
    
            // Check the search yields results
            await expect(page.getByRole('heading', {name: 'Results', exact: true})).toBeVisible();
        });
    
        test('sorted from highest to lowest price works', async ({ page }) => {
            // Search "Nikon"
            await page.getByRole('searchbox', {name: 'Search Amazon'}).fill('Nikon');
            await page.getByRole('button', {name: 'GO'}).first().click();
            await expect(page.getByRole('heading', {name: 'Results', exact: true})).toBeVisible();
    
            // Create locator for sortby dropdown button
            const sortby = page.locator('span#a-autoid-0-announce');
    
            sortby.click();
    
            // Create locator for Price: High to Low in dropdown
            const highToLow = page.locator('a#s-result-sort-select_2');
    
            highToLow.click();
    
            // Create locator for text in Sort by dropdown container
            const sorted = page.locator('span.a-dropdown-prompt')
    
            // Check search results are sorted from highest to lowest price
            await expect(sorted).toContainText('Price: High to Low');
        })

        test('second product once clicked for more details has title containing D6', async({ page }) => {
            // Search "Nikon"
            await page.getByRole('searchbox', {name: 'Search Amazon'}).fill('Nikon');
            await page.getByRole('button', {name: 'GO'}).first().click();
            await expect(page.getByRole('heading', {name: 'Results', exact: true})).toBeVisible();

            // Sort search results from highest to lowest price
            const sortby = page.locator('span#a-autoid-0-announce');
            sortby.click({delay: 1000});

            const highToLow = page.locator('a#s-result-sort-select_2');
            highToLow.click({delay: 1000});
    
            const sorted = page.locator('span.a-dropdown-prompt')
            await expect(sorted).toContainText('Price: High to Low');

            // Select second product
            await page.getByRole('link', {name: 'See options'}).nth(1).click();

            // Check product title for "Nikon D6"
            await expect(page.getByRole('heading', {name: 'Nikon D6'})).toBeVisible();
        })
    })
})
