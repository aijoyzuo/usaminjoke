import { test, expect } from '@playwright/test';

test('search finds an existing meme by its title', async ({ page }) => {
  await page.goto('/');

  const firstCoverImage = page.locator('.grid a img').first();
  await firstCoverImage.waitFor();
  const title = await firstCoverImage.getAttribute('alt');
  test.skip(!title, '目前資料庫沒有梗圖可供測試');

  await page.getByPlaceholder('搜尋梗圖...').fill(title!);
  await page.getByRole('button', { name: '搜尋' }).click();

  await expect(page).toHaveURL(/[?&]q=/);
  await expect(page.getByText(`搜尋「${title}」的結果`)).toBeVisible();
  await expect(page.getByText('找不到相關梗圖')).not.toBeVisible();
});

test('search shows the empty state when nothing matches', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('搜尋梗圖...').fill('zzz-e2e-no-such-meme-xyz123');
  await page.getByRole('button', { name: '搜尋' }).click();

  await expect(page.getByText('找不到相關梗圖')).toBeVisible();
});
