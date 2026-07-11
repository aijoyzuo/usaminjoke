import { test, expect } from '@playwright/test';

const email = process.env.E2E_ADMIN_EMAIL;
const password = process.env.E2E_ADMIN_PASSWORD;

test.skip(!email || !password, '需要設定 E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD 才能執行登入測試');

test('admin can log in and out', async ({ page }) => {
  await page.goto('/admin/login');

  await page.getByPlaceholder('Email').fill(email!);
  await page.getByPlaceholder('密碼').fill(password!);
  await page.getByRole('button', { name: '登入' }).click();

  await expect(page).toHaveURL('/admin');
  await expect(page.getByRole('heading', { name: '後台管理' })).toBeVisible();

  await page.getByRole('button', { name: '登出' }).click();

  await expect(page).toHaveURL('/admin/login');
  await expect(page.getByRole('heading', { name: '登入' })).toBeVisible();
});
