'use strict'

import {app, BrowserWindow} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow2
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

app.on('ready', newWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  console.log('activate')
  if (!BrowserWindow.getAllWindows() || BrowserWindow.getAllWindows().length === 0) {
    newWindow()
  }
})

function newWindow (optionsArg) {
  let options = optionsArg || {}
  const mainWindow = new BrowserWindow({
    height: 510,
    width: 340,
    useContentSize: true,
    show: false,
    maximizable: false,
    title: 'Apk Parser',
    alwaysOnTop: !!options['alwaysOnTop']
    // resizable: false,
    // fullscreen: false,
    // fullscreenable: false
  })
  // mainWindow.isMenuBarVisible(false)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    // mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.closeDevTools()
}

const {ipcMain} = require('electron')
ipcMain.on('newWindow', () => {
  const alwaysOnTop = BrowserWindow.getFocusedWindow().isAlwaysOnTop()
  newWindow({alwaysOnTop})
})

// ipcMain.on('ondragstart', (event, filePath) => {
//   event.sender.startDrag({
//     file: filePath,
//     icon: '/path/to/icon.png'
//   })
// })

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
