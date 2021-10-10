"use strict";

var _CreateBrowser = _interopRequireDefault(require("./CreateBrowser/CreateBrowser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  try {
    const newBrowser = new _CreateBrowser.default();
    const {
      browser,
      page
    } = await newBrowser.init();
    await page.goto('https://google.com.br', {
      waitUntil: 'networkidle0'
    });
    await page.waitForTimeout(10000);
    await newBrowser.closeAll(browser);
  } catch (error) {
    console.log(error);
  }
})();