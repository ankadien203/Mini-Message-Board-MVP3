const { test, expect } = require('@playwright/test');

test.describe('Mini Message Board MVP 3', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Chờ danh mục được tải và giao diện sẵn sàng
    await expect(page.locator('#category option').first()).toBeAttached();
    await expect(page.locator('#status')).not.toContainText('HTTP error');
  });

  test('hiển thị giao diện và danh sách tin nhắn', async ({ page }) => {
  await expect(page).toHaveTitle(/Mini Message Board MVP 3/);
  await expect(page.locator('#content')).toBeVisible();
  await expect(page.locator('#category')).toBeVisible();
  await expect(page.locator('#search')).toBeVisible();
  await expect(page.locator('#stats')).toBeVisible();
  await expect(page.locator('#list')).toBeAttached();
});

  test('thêm tin nhắn mới', async ({ page }) => {
    const message = `Playwright test ${Date.now()}`;

    await page.locator('#content').fill(message);

    // Chọn danh mục đầu tiên
    await page.locator('#category').selectOption({
      index: 0,
    });

    await page.locator('#frm button[type="submit"], #frm button').click();

    // Tin nhắn mới phải xuất hiện trên giao diện
    await expect(page.locator('#list')).toContainText(message);
  });

  test('tìm kiếm tin nhắn', async ({ page }) => {
    const message = `Search test ${Date.now()}`;

    // Tạo tin nhắn cần tìm
    await page.locator('#content').fill(message);
    await page.locator('#category').selectOption({
      index: 0,
    });
    await page.locator('#frm button').click();

    await expect(page.locator('#list')).toContainText(message);

    // Tìm kiếm theo nội dung
    await page.locator('#q').fill(message);
    await page.locator('#search').click();

    await expect(page.locator('#list')).toContainText(message);
  });

  test('xem thống kê danh mục', async ({ page }) => {
    await page.locator('#stats').click();

    // Kết quả thống kê được hiển thị dưới dạng JSON
    await expect(page.locator('#result')).not.toBeEmpty();
    await expect(page.locator('#status')).toContainText('HTTP 200');
  });
});