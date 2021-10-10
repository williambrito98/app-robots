import { ipcMain } from 'electron'
import { resolve } from 'path'
import {RobotWorker} from  './worker/RobotWorker'
import {} from 'fs'

const process_worker = {}

ipcMain.on('run', async (event, arg) => {
    const pathFileIndexRobot = resolve(process.cwd(), 'robots', arg, 'dist', 'index.js')
    const w = new RobotWorker(pathFileIndexRobot)
    process_worker[w.threadId] = w
    event.reply('threadId', w.threadId)
})


ipcMain.on('kill', (event, arg) => {
    process_worker[arg].postMessage('close')
})


ipcMain.on('saveConfig', (event, args) => {
    process.env.BROWSER_PATH = args
    if (process.env.BROWSER_PATH === args)
        event.reply('alertSucess', 'Dados Salvos com sucesso')
    else
        event.reply('alertDanger', 'Erro ao gravar os dados')

})
