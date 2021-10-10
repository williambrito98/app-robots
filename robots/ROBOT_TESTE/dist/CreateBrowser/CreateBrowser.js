"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _puppeteerCore = _interopRequireDefault(require("puppeteer-core"));

var _dotenv = require("dotenv");

var _listenWorker = require("../Worker/listenWorker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)({
  path: `${process.cwd()}/src/CreateBrowser/config/.env`
});

class CreateBrowser {
  async init() {
    const CONFIG = this.setConfig();
    this.browser = await _puppeteerCore.default.launch(CONFIG);
    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(80000);
    this.page.setDefaultNavigationTimeout(80000);
    await this.page.setViewport(CONFIG.defaultViewport);
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
    this.page = await this.setLocalDownloadFiles(this.page, CONFIG.pathDownload);
    (0, _listenWorker.listenClose)();
    return {
      browser: this.browser,
      page: this.page
    };
  }

  async setLocalDownloadFiles(page, localDownload) {
    // @ts-ignore
    await page._client.send('Page.setDownloadBehavior', {
      downloadPath: localDownload,
      behavior: 'allow'
    });
    return page;
  }

  async closeAll(browser) {
    const pages = await browser.pages();
    await this.closeAllPages(pages);
    await browser.close();
  }

  async closeAllPages(pages) {
    if (pages.length === 0) {
      return true;
    }

    await pages.pop().close();
    return this.closeAllPages(pages);
  }

  setConfig() {
    return {
      pathDownload: process.env.pathDownload,
      executablePath: process.env.executablePath,
      userDataDir: process.env.userDataDir,
      slowMo: parseInt(process.env.slowMo, 10),
      args: process.env.args.split(','),
      defaultViewport: JSON.parse(process.env.defaultViewport),
      ignoreDefaultArgs: process.env.ignoreDefaultArgs.split(','),
      ignoreHTTPSErrors: this.strToBoolean(process.env.ignoreHTTPSErrors),
      headless: this.strToBoolean(process.env.headless)
    };
  }

  strToBoolean(str) {
    return str === 'true';
  }

}

exports.default = CreateBrowser;