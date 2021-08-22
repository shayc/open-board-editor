jest.setTimeout(30000);

describe('app', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3001');
  });

  it('should find an image', async () => {
    await expect(page).toMatchElement('img');
  });
});
