"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printCaptcha = printCaptcha;

var _path = require("path");

async function printCaptcha(page, selectorImg) {
  await page.waitForTimeout(2500);
  const imageCaptcha = await page.$(selectorImg);
  const imageProprieties = await imageCaptcha.boundingBox();
  await page.waitForTimeout(2500);
  await page.screenshot({
    path: (0, _path.resolve)('./src/components/captcha/normal/images/captcha.png'),
    type: 'png',
    clip: {
      x: imageProprieties.x,
      y: imageProprieties.y,
      width: imageProprieties.width,
      height: imageProprieties.height
    }
  });
}