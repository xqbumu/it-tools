import { test, expect } from '@playwright/test';

test.describe('Tool - Tpl csv json', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tpl-csv-json');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Tpl csv json - IT Tools');
  });

  test('', async ({ page }) => {

  });
});