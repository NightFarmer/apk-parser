'use strict'

import {app, BrowserWindow} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let mainWindow2
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 490,
    useContentSize: true,
    width: 350,
    show: false,
    maximizable: false
    // resizable: false,
    // fullscreen: false,
    // fullscreenable: false
  })
  // mainWindow.isMenuBarVisible(false)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow2 = new BrowserWindow({
    height: 490,
    useContentSize: true,
    width: 650,
    show: false,
    maximizable: false
    // resizable: false,
    // fullscreen: false,
    // fullscreenable: false
  })
  // mainWindow.isMenuBarVisible(false)

  mainWindow2.loadURL(winURL)

  mainWindow2.on('closed', () => {
    mainWindow2 = null
  })

  mainWindow2.once('ready-to-show', () => {
    mainWindow2.show()
  })

  mainWindow.closeDevTools()
  mainWindow2.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const { ipcMain } = require('electron')
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})

// app.dock.hide() // 不显示Mac菜单栏

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
