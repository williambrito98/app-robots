import { contextBridge, ipcRenderer } from 'electron'
import { lstatSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'

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
    const pathRobots = join(process.cwd(), 'robots')
    return readdirSync(pathRobots).filter(item => lstatSync(join(pathRobots, item)).isDirectory())
  },
  getLayout: (robot) => {
    const pathLayoutRobot = join(process.cwd(), 'robots', robot, 'dist', 'config', 'layout.json')
    const contentLayout = readFileSync(pathLayoutRobot)
    return JSON.parse(contentLayout)
  }
})