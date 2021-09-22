import { ipcMain } from 'electron'
import { Worker } from 'worker_threads'
import { resolve } from 'path'

const process_worker = {}
ipcMain.on('run', async (event, arg) => {
    console.log(process.cwd())
    const w = new Worker(resolve(process.cwd(),'robots', arg, 'dist', 'index.js'))
    process_worker[w.threadId] = w
    event.reply('response', w.threadId)
})
ipcMain.on('kill', (event, arg) => {
    process_worker[arg].postMessage('close')
})