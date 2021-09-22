"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _puppeteerCore = require("puppeteer-core");

var _UserBrowserConfig = _interopRequireDefault(require("./config/UserBrowserConfig.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateBrowser {
  async init() {
    this.browser = await (0, _puppeteerCore.launch(_UserBrowserConfig.default));
    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(30000);
    this.page.setDefaultNavigationTimeout(30000);
    await this.page.setViewport(_UserBrowserConfig.default.defaultViewport);
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
    this.page = await this.setLocalDownloadFiles(this.page, _UserBrowserConfig.default.pathDownload);
    return {
      browser: this.browser,
      page: this.page
    };
  }

  async setLocalDownloadFiles(page, localDownlod) {
    // @ts-ignore
    await page._client.send('Page.setDownloadBehavior', {
      downloadPath: localDownlod,
      behavior: 'allow'
    });
    return page;
  }

}

exports.default = CreateBrowser;