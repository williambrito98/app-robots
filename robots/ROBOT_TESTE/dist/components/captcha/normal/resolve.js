"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveCaptcha = resolveCaptcha;

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("../config.json"));

var _path = require("path");

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function resolveCaptcha() {
  async function submitCaptcha() {
    return new Promise((resolve, reject) => {
      _axios.default.post(_config.default.submit.url, {
        method: _config.default.submit.method,
        key: _config.default.key,
        body: (0, _fs.readFileSync)((0, _path.resolve)('./src/components/captcha/normal/images/captcha.png'), {
          encoding: 'base64'
        })
      }).then(response => resolve(response.data.replace('OK|', '').trim())).catch(error => reject(error));
    });
  }

  async function getCaptchaSolution(id) {
    return new Promise((resolve, reject) => {
      _axios.default.get(_config.default.solution.url, {
        params: {
          action: _config.default.solution.action,
          key: _config.default.key,
          id: id
        }
      }).then(response => resolve(response.data)).catch(error => reject(error));
    });
  }

  const idSubmitImage = await submitCaptcha().catch(e => 'error');

  if (idSubmitImage === 'error') {
    console.log('erro ao enviar imagem');
    return false;
  }

  const solutionCaptha = await getCaptchaSolution(Number(idSubmitImage));

  if (!solutionCaptha.includes('OK|')) {
    console.log('erro ao resolver captcha ' + solutionCaptha);
    return false;
  }

  return solutionCaptha.replace('OK|', '');
}