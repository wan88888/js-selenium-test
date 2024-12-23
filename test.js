const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

describe('Google Search Test', function () {
    let driver;
    this.timeout(30000); // 增加测试超时时间

    before(async function () {
        const chrome = require('selenium-webdriver/chrome');
        const options = new chrome.Options();
        options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should open Google and search for Selenium WebDriver', async function () {
        await driver.get('https://www.google.com');
        const searchBox = await driver.findElement(By.name('q'));

        // 确保输入完成后再按回车
        await searchBox.sendKeys('Selenium WebDriver');
        await driver.sleep(500); // 短暂延迟以确保输入稳定
        await searchBox.sendKeys(Key.RETURN);

        // 等待搜索结果加载
        const searchResults = By.id('search'); // 搜索结果的区域 ID
        await driver.wait(until.elementLocated(searchResults), 10000);

        // 等待标题更新
        await driver.wait(until.titleContains('Selenium WebDriver'), 10000);
        const title = await driver.getTitle();

        // 断言标题包含关键词
        assert.strictEqual(title.includes('Selenium WebDriver'), true);
    });
});