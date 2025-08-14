// @ts-check
import { test, expect } from '@playwright/test';

/**
 * React.dev Homepage Test Suite
 * 
 * This test suite validates core functionality of the React.dev website including:
 * - Page structure (header/footer)
 * - Theme toggle functionality
 * - Keyboard navigation accessibility
 * - Search functionality with favorites
 */

test.describe('ReactJS Homepage Tests', () => {

    /**
     * Setup: Navigate to React.dev homepage before each test
     * Ensures consistent starting state for all tests
     */
    test.beforeEach(async ({ page }) => {
        console.log('🚀 Navigating to React.dev homepage...');

        // Navigate to React.dev homepage
        await page.goto('https://react.dev/');

        // Wait for network to be idle to ensure full page load
        await page.waitForLoadState('networkidle');

        console.log('✅ Page loaded successfully');
    });

    /**
     * Test: Verify Header and Footer Presence
     * 
     * Uses multiple strategies to locate header and footer elements:
     * 1. Semantic HTML tags (header, footer)
     * 2. Common CSS class patterns
     */
    test('Should have a header and footer on the homepage', async ({ page }) => {
        await test.step('Verify header element exists', async () => {
            console.log('🔍 Checking for header element...');

            // Strategy 1: Look for semantic header tag
            const headerElement = page.locator('header');

            // Strategy 2: Look for common header class names
            const headerByClass = page.locator('[class*="header"], [class*="nav"]');

            // Check if header exists using either strategy
            const hasSemanticHeader = await headerElement.count() > 0;
            const hasHeaderByClass = await headerByClass.count() > 0;

            // Assert that at least one header approach found an element
            expect(hasSemanticHeader || hasHeaderByClass).toBeTruthy();

            console.log('✅ Header element found');
        });

        await test.step('Verify footer element exists', async () => {
            console.log('🔍 Checking for footer element...');

            // Strategy 1: Look for semantic footer tag
            const footerElement = page.locator('footer');

            // Strategy 2: Look for common footer class names
            const footerByClass = page.locator('[class*="footer"]');

            // Check if footer exists using either strategy
            const hasSemanticFooter = await footerElement.count() > 0;
            const hasFooterByClass = await footerByClass.count() > 0;

            // Assert that at least one footer approach found an element
            expect(hasSemanticFooter || hasFooterByClass).toBeTruthy();

            console.log('✅ Footer element found');
        });
    });

    /**
     * Test: Theme Toggle Functionality
     * 
     * Verifies that the dark/light mode toggle works correctly:
     * 1. Button is visible and accessible
     * 2. Clicking toggles the theme
     * 3. Body class reflects the theme change
     */
    test('Verify the theme toggle works as expected', async ({ page }) => {
        await test.step('Locate and verify theme toggle button', async () => {
            console.log('🔍 Checking for theme toggle...');

            // Locate the theme toggle button by its accessible name
            const themeToggle = page.getByRole('button', { name: 'Use Dark Mode' });

            // Verify the theme toggle button is visible
            await expect(themeToggle).toBeVisible();

            console.log('✅ Theme toggle button found and visible');
        });

        await test.step('Toggle theme and verify change', async () => {
            const themeToggle = page.getByRole('button', { name: 'Use Dark Mode' });

            // Click the theme toggle to switch to dark mode
            await themeToggle.click();

            console.log('🔄 Theme toggle clicked');

            // Verify that the theme has changed to dark mode
            const body = page.locator('body');

            // Check if body has a class indicating dark mode
            await expect(body).toHaveClass(/dark/);

            console.log('✅ Dark mode successfully activated');
        });
    });

    /**
     * Test: Keyboard Navigation Accessibility
     * 
     * Ensures all navigation elements are accessible via keyboard:
     * - Tests tab order through all interactive elements
     * - Verifies proper focus management
     */
    test('Navigation menu should be accessible via keyboard', async ({ page }) => {
        console.log('⌨️ Testing keyboard navigation accessibility...');

        // Define all navigation elements in expected tab order
        const navigationElements = {
            reactLogo: page.getByRole('link', { name: 'React', exact: true }),
            version: page.getByRole('link', { name: 'v19.1' }),
            learnButton: page.getByRole('link', { name: 'Learn', exact: true }),
            referenceButton: page.getByRole('link', { name: 'Reference', exact: true }),
            communityButton: page.getByRole('navigation').getByRole('link', { name: 'Community' }),
            blogButton: page.getByRole('navigation').getByRole('link', { name: 'Blog' }),
            themeToggle: page.getByRole('button', { name: 'Use Dark Mode' }),
            translateButton: page.getByRole('link', { name: 'Translations' }),
            githubButton: page.getByRole('link', { name: 'Open on GitHub' })
        };

        // Test keyboard navigation through each element
        await test.step('Navigate through elements using Tab key', async () => {
            // Skip to React logo (usually first focusable element after browser UI)
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await expect(navigationElements.reactLogo).toBeFocused();
            console.log('✅ React logo focused');

            // Continue through each navigation element
            await page.keyboard.press('Tab');
            await expect(navigationElements.version).toBeFocused();
            console.log('✅ Version link focused');

            // Note: Extra tab press might be needed for some layouts
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await expect(navigationElements.learnButton).toBeFocused();
            console.log('✅ Learn button focused');

            await page.keyboard.press('Tab');
            await expect(navigationElements.referenceButton).toBeFocused();
            console.log('✅ Reference button focused');

            await page.keyboard.press('Tab');
            await expect(navigationElements.communityButton).toBeFocused();
            console.log('✅ Community button focused');

            await page.keyboard.press('Tab');
            await expect(navigationElements.blogButton).toBeFocused();
            console.log('✅ Blog button focused');

            await page.keyboard.press('Tab');
            await expect(navigationElements.themeToggle).toBeFocused();
            console.log('✅ Theme toggle focused');

            await page.keyboard.press('Tab');
            await expect(navigationElements.translateButton).toBeFocused();
            console.log('✅ Translations button focused');

            await page.keyboard.press('Tab');
            await expect(navigationElements.githubButton).toBeFocused();
            console.log('✅ GitHub button focused');
        });

        console.log('✅ All navigation elements are keyboard accessible');
    });

    /**
     * Test: Search Functionality with Favorites
     * 
     * Comprehensive test of the search feature:
     * 1. Open search modal
     * 2. Perform search query
     * 3. Select search result
     * 4. Save search to favorites
     * 5. Access saved search
     */
    test('Test search functionality with favorites', async ({ page }) => {
        console.log('🔍 Testing search functionality...');

        await test.step('Open search and perform query', async () => {
            // Locate and click the search trigger
            const searchTrigger = page.getByRole('button', { name: 'Search Ctrl K' });
            await searchTrigger.click();

            console.log('✅ Search bubble opened');

            // Locate the search input field
            const searchInput = page.getByRole('searchbox', { name: 'Search' });

            // Perform search for "custom hook"
            await searchInput.click();
            await page.keyboard.type('custom hook');

            // Wait for search results to populate
            await page.waitForTimeout(500);

            console.log('✅ Search query entered: "custom hook"');
        });

        await test.step('Select first search result', async () => {
            // Select first search result using Enter key
            await page.keyboard.press('Enter');

            console.log('✅ First search result selected');
        });

        await test.step('Save search to favorites', async () => {
            // Reopen search bubble
            const searchTrigger = page.getByRole('button', { name: 'Search Ctrl K' });
            await searchTrigger.click();

            // Locate and click the save/star button
            const saveButton = page.getByRole('button', { name: 'Save this search' });
            await expect(saveButton).toBeVisible();
            await saveButton.click();

            console.log('✅ Search saved to favorites');
        });

        await test.step('Access saved search', async () => {
            // Close and reopen search modal
            await page.keyboard.press('Escape');

            const searchTrigger = page.getByRole('button', { name: 'Search Ctrl K' });
            await searchTrigger.click();

            // Locate and click the favorite search
            const favoriteSearch = page.getByRole('listbox', { name: 'Search' }).getByRole('link');
            await favoriteSearch.click();

            console.log('✅ Favorite search accessed');
        });

        await test.step('Verify saved search result', async () => {
            // Verify the saved search result is displayed
            const savedResult = page.getByRole('link', { name: 'Reusing Logic with Custom' });
            await expect(savedResult).toBeVisible();

            console.log('✅ Saved search result verified');
        });

        console.log('✅ Search functionality test completed successfully');
    });
});