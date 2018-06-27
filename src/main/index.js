'use strict'

import {app, BrowserWindow} from 'electron'
import path from 'path'
import os from 'os'
import fs from 'fs-extra'
import {exec} from 'child_process'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

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
  if (!BrowserWindow.getAllWindows() || BrowserWindow.getAllWindows().length === 0) {
    newWindow()
  }
})

function getAaptFileOriginPath () {
  let aaptDir = path.join(__static, 'aapt')
  switch (os.platform()) {
    case 'darwin':
      return path.join(aaptDir, 'aapt_darwin')
    case 'linux':
      return path.join(aaptDir, 'aapt_linux')
    case 'win32':
      return path.join(aaptDir, 'aapt.exe')
    default:
    // this.warning('不支持当前平台')
  }
}

function getUnzipFileOriginPath () {
  let unzipDir = path.join(__static, 'unzip')
  switch (os.platform()) {
    case 'darwin':
      return path.join(unzipDir, 'unzip_darwin')
    case 'linux':
      return path.join(unzipDir, 'unzip_linux')
    case 'win32':
      return path.join(unzipDir, 'unzip.exe')
    default:
    // this.warning('不支持当前平台')
  }
}

function getTmpPath () {
  let tmpDir = path.join(os.tmpdir(), 'top.nightfarmer.apkparser')
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir)
  }
  if (!fs.existsSync(tmpDir)) {
    // this.warning('临时文件夹创建失败')
  }
  return tmpDir
}

function decompressFile (origin) {
  const outFileName = path.join(getTmpPath(), path.basename(origin))
  if (fs.existsSync(outFileName)) {
    return outFileName
  }
  if (os.platform() === 'linux' && path.basename(origin) === 'aapt_linux') {
    fs.copySync(path.join(path.join(__static, 'aapt'), 'lib64'), path.join(getTmpPath(), 'lib64'))
  }
  fs.copySync(origin, outFileName)
  return outFileName
}

function newWindow (optionsArg) {
  let options = optionsArg || {}

  try {
    decompressFile(getAaptFileOriginPath())
    decompressFile(getUnzipFileOriginPath())
  } catch (e) {
    console.error('init error')
  }

  const mainWindow = new BrowserWindow({
    height: 510,
    width: 340,
    useContentSize: true,
    show: false,
    maximizable: false,
    title: 'Apk Parser',
    alwaysOnTop: !!options['alwaysOnTop'],
    resizable: true,
    fullscreen: false,
    fullscreenable: false
  })
  // mainWindow.isMenuBarVisible(false)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    if (!BrowserWindow.getAllWindows() || BrowserWindow.getAllWindows().length === 0) {
      fs.removeSync(getTmpPath())
    }
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.openDevTools()
}

const {ipcMain} = require('electron')
ipcMain.on('newWindow', () => {
  const alwaysOnTop = BrowserWindow.getFocusedWindow().isAlwaysOnTop()
  newWindow({alwaysOnTop})
})

ipcMain.on('parseApk', async (event, apkPath) => {
  let parseCommand = `"${decompressFile(getAaptFileOriginPath())}" d badging "${apkPath}"`
  exec(parseCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      event.returnValue = err + 'err' + '-----' + parseCommand
      return
    }
    event.returnValue = stdout
  })
})

ipcMain.on('unzipIcon', async (event, apkPath, iconPath) => {
  if (path.extname(iconPath) === '.xml') {
    return 'err'
  }
  let command = `"${decompressFile(getUnzipFileOriginPath())}" "${apkPath}" "${getTmpPath()}" "${iconPath}"`
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr)
      // this.warning('图标解压失败')
      event.returnValue = 'err'
      return
    }
    let iconLocalPath = path.join(getTmpPath(), path.basename(iconPath))
    let iconBuf = fs.readFileSync(iconLocalPath)
    event.returnValue = 'data:image/png;base64,' + iconBuf.toString('base64')
  })
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
