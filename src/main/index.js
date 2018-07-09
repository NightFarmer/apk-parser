'use strict'

import {app, BrowserWindow, dialog} from 'electron'
import path from 'path'
import os from 'os'
import fs from 'fs'
import {exec} from 'child_process'
import LocaleStrings from '../dict/LocaleStrings'

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

function labels () {
  return isEN() ? LocaleStrings.en : LocaleStrings.zh
}

function isEN () {
  let locale = app.getLocale()
  return locale && locale.indexOf('zh') === -1
}

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
      throw Error(labels().platformUnSupported)
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
      throw Error(labels().platformUnSupported)
  }
}

function getTmpPath () {
  let tmpDir = path.join(os.tmpdir(), 'top.nightfarmer.apkparser')
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir)
  }
  if (!fs.existsSync(tmpDir)) {
    throw Error(labels().tmpFolderCreateFail)
  }
  return tmpDir
}

function decompressFile (origin) {
  const outFileName = path.join(getTmpPath(), path.basename(origin))
  if (fs.existsSync(outFileName)) {
    return outFileName
  }
  if (os.platform() === 'linux' && path.basename(origin) === 'aapt_linux') {
    copyFolderRecursiveSync(path.join(path.join(__static, 'aapt'), 'lib64'), getTmpPath())
  }
  copyFileSync(origin, outFileName)
  fs.chmodSync(outFileName, '755')
  return outFileName
}

function newWindow (optionsArg) {
  let options = optionsArg || {}

  try {
    decompressFile(getAaptFileOriginPath())
    decompressFile(getUnzipFileOriginPath())
  } catch (e) {
    console.error('init error', e)
  }

  const mainWindow = new BrowserWindow({
    height: 510,
    width: 340,
    useContentSize: true,
    show: false,
    maximizable: false,
    title: 'Apk Parser',
    alwaysOnTop: !!options['alwaysOnTop'],
    resizable: false,
    fullscreen: false,
    fullscreenable: false
  })
  // mainWindow.isMenuBarVisible(false)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    if (!BrowserWindow.getAllWindows() || BrowserWindow.getAllWindows().length === 0) {
      deleteFolderRecursive(getTmpPath())
    }
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

ipcMain.on('parseApk', async (event, apkPath) => {
  try {
    let parseCommand = `"${decompressFile(getAaptFileOriginPath())}" d badging "${apkPath}"`
    exec(parseCommand, (err, stdout, stderr) => {
      if (err) {
        event.returnValue = {errMsg: labels().parseFailed}
        return
      }
      event.returnValue = stdout
    })
  } catch (e) {
    event.returnValue = {errMsg: e.message || labels().parseFailed}
  }
})

ipcMain.on('unzipIcon', async (event, apkPath, iconPath) => {
  if (path.extname(iconPath) === '.xml') {
    event.returnValue = {errMsg: labels().previewUnsupported}
    return
  }
  try {
    let command = `"${decompressFile(getUnzipFileOriginPath())}" "${apkPath}" "${getTmpPath()}" "${iconPath}"`
    exec(command, (err, stdout, stderr) => {
      if (err) {
        event.returnValue = {errMsg: labels().iconDecompressionFailed}
        return
      }
      let iconLocalPath = path.join(getTmpPath(), path.basename(iconPath))
      let iconBuf = fs.readFileSync(iconLocalPath)
      event.returnValue = 'data:image/png;base64,' + iconBuf.toString('base64')
    })
  } catch (e) {
    event.returnValue = {errMsg: e.message || labels().iconDecompressionFailed}
  }
})

// app.dock.hide() // 不显示Mac菜单栏

function copyFileSync (source, target) {
  let targetFile = target

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

function copyFolderRecursiveSync (source, target) {
  let files = []

  let targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function (file) {
      let curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }
}

function deleteFolderRecursive (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      let curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
