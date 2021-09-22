"use strict";

var _CreateBrowser = _interopRequireDefault(require("./CreateBrowser/CreateBrowser"));

var _clientes = _interopRequireDefault(require("./clientes2.json"));

var _fs = require("fs");

var _util = require("util");

var _child_process = require("child_process");


const _worker_threads = require('worker_threads')

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CONFIG2 = _clientes.default;

async function main() {
  const execPromise = (0, _util.promisify)(_child_process.exec);
  const newBrowser = new _CreateBrowser.default();
  const {
    browser,
    page
  } = await newBrowser.init();

  _worker_threads.parentPort.on('message', (message) => {
    process.exit(1)
  })

  try {
    await page.goto('https://cav.receita.fazenda.gov.br/autenticacao/Login', {
      waitUntil: 'domcontentloaded'
    });
    await execPromise('"C:\\Program Files\\AutoHotkey\\AutoHotkey.exe" clickButtonEcac.ahk');
    await page.waitForSelector('#cert-digital > a').catch(e => '');
    await page.click('#cert-digital > a').catch(e => '');

    for (let index = 0; index < _clientes.default.length; index++) {
      await page.waitForSelector('#btnPerfil');
      await page.click('#btnPerfil');
      await page.waitForSelector('#txtNIPapel2');
      console.log(_clientes.default[index].CNPJ);
      await page.type('#txtNIPapel2', _clientes.default[index].CNPJ.toString());
      await page.click('#formPJ > input.submit');
      await page.waitForTimeout(2000);
      const error = await page.$eval('#perfilAcesso > div.erro > p', element => element.textContent).catch(e => 'sem errro');

      if (error.replace('ATENÇÃO:', '').trim() !== '' && error !== 'sem errro') {
        (0, _fs.appendFileSync)('error.csv', _clientes.default[index].Nome + ';' + _clientes.default[index].CNPJ.toString() + ';' + error + '\n');
        await page.evaluate(() => {
          // @ts-ignore
          document.querySelector('#txtNIPapel2').value = '';
        });
        await page.click('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable > div.ui-dialog-titlebar.ui-widget-header.ui-corner-all.ui-helper-clearfix > a');
        CONFIG2.shift();
        continue;
      }

      await page.click('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.no-close.ui-resizable > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button').catch(e => '');
      await page.click('#btnCaixaPostal');
      await page.waitForSelector('#frmApp');
      await page.click('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.no-close.ui-resizable > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button').catch(e => '');
      await page.waitForSelector('#frmApp'); // @ts-ignore

      const urlIframe = await page.$eval('#frmApp', element => element.src);
      const page2 = await browser.newPage();
      await page2.goto(urlIframe, {
        waitUntil: 'networkidle0'
      });
      await page2.click('#linkInformacoesAdicionais');
      await page2.waitForSelector('#DDD1');
      await page2.type('#DDD2', '11');
      await page2.type('#numTel2', '99900-9125');
      await page2.type('#Email2', 'danilo@uphold.com.br'); // @ts-ignore

      const PalavraChave = await page2.$eval('#PalavraChave', element => element.value);
      if (!PalavraChave) await page2.type('#PalavraChave', 'atendimento');
      await page2.click('#btnAlterar').catch(e => '');
      await page2.click('#btnCadastrar').catch(e => '');
      await page2.waitForSelector('#panelMensagem');
      await page2.waitForTimeout(3000);
      const mensagem = await page2.$eval('#panelMensagem', element => element.textContent.trim());

      if (mensagem === 'Número Celular inválido!') {
        (0, _fs.appendFileSync)('error.csv', _clientes.default[index].Nome + ';' + _clientes.default[index].CNPJ.toString() + ';Número Celular inválido!' + '\n');
      }

      await page2.close();
      CONFIG2.shift();
    }

    await page.close()
    await browser.close()

    return true;
  } catch (error) {
    (await browser.pages()).map(async page => await page.close());
    await browser.close();
    (0, _fs.writeFileSync)('./src/clientes2.json', JSON.stringify(CONFIG2));
    return await main();
  }
}

(async () => await main())()