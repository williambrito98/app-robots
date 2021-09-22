import { contextBridge, ipcRenderer } from 'electron'
import { readdirSync } from 'fs'
import { join } from 'path'



// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    // whitelist channels
    //    let validChannels = ['toMain']
    //  if (validChannels.includes(channel)) {
    ipcRenderer.send(channel, data)
    //  }
  },
  receive: (channel, func) => {
    // let validChannels = ['fromMain']
    // if (validChannels.includes(channel)) {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, func)
    //}
  }
})

contextBridge.exposeInMainWorld('robots', {
  getAll: () => {
    return readdirSync(join(process.cwd(), 'robots'))
  }
})