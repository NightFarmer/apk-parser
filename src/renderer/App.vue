<template>
    <div id="app" class="main"
         @dragenter="onDrag"
         @dragover="onDrag"
         @drop="onDrop"
    >
        <!--<landing-page></landing-page>-->
        <div class="row">
            <div class="label" @click="newWindow">
                图标
            </div>
            <div>
                <div class="icon_border" v-if="apkInfo.icon==='xml'">不支持<br/>预览</div>
                <div class="icon_border" v-else-if="!apkInfo.icon"></div>
                <img :src="apkInfo.icon" class="icon" v-else=""/>
            </div>
        </div>

        <div class="row">
            <div class="label">
                包名
            </div>
            <div>
                <input v-model="apkInfo.package" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
            </div>
        </div>

        <div class="row">
            <div class="label">
                名称
            </div>
            <div>
                <input v-model="apkInfo.name" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
            </div>
        </div>

        <div class="row">
            <div class="label">
                版本号
            </div>
            <div>
                <input v-model="apkInfo.versionName" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
            </div>
        </div>

        <div class="row">
            <div class="label">
                内部版本号
            </div>
            <div>
                <input v-model="apkInfo.versionCode" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
            </div>
        </div>

        <div class="row">
            <div class="label">
                Min.SDK
            </div>
            <div>
                <input v-model="apkInfo.minSdk" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
            </div>
        </div>

        <div class="row">
            <div class="label">
                文件名
            </div>
            <div>
                <input v-model="apkInfo.fileName" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
            </div>
        </div>


        <div class="row">
            <div class="label">
                文件大小
            </div>
            <div>
                <input v-model="apkInfo.fileSize" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
            </div>
        </div>

        <div class="row">
            <div class="label">
                MD5
            </div>
            <div>
                <input v-model="apkInfo.fileMD5" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
            </div>
        </div>


        <div class="row">
            <div class="label">
                权限
            </div>
            <div class="permission_list">
                <div v-for="item in apkInfo.permissionList"
                     class="permission_list_item"
                >{{item}}
                </div>
            </div>
        </div>

        <div class="checkbox_area" @click="windowTop=!windowTop">
            <check-box v-model="windowTop" style="margin-right: 5px"></check-box>
            <span>窗口置顶</span>
        </div>
    </div>
</template>

<script>
  // import LandingPage from '@/components/LandingPage'
  import electron, {remote, ipcRenderer as ipc, BrowserWindow} from 'electron'
  import path from 'path'
  import {exec} from 'child_process'
  import md5File from 'md5-file'
  import PermissionMap from '../dict/PermissionMap'
  import VersionMap from '../dict/VersionMap'
  import os from 'os'
  import fs from 'fs'
  import decompress from 'decompress'
  import yauzl from 'yauzl'
  import CheckBox from './components/CheckBox'
  // let childProcess = require('child_process')

  // const {dialog} = require('electron')
  // console.log(electron)

  const PrimaryColor = '#1aad86'
  // const PrimaryColor = '#419688'

  export default {
    name: 'apk-parser',
    components: {
      CheckBox
      // LandingPage
    },
    data: function () {
      return {
        apkInfo: {
          package: '',
          icon: '',
          name: '',
          versionName: '',
          versionCode: '',
          minSdk: '',
          fileName: '',
          fileSize: '',
          fileMD5: '',
          permissionList: []
        },
        windowTop: false
      }
    },
    watch: {
      windowTop: function (val) {
        remote.BrowserWindow.getFocusedWindow().setAlwaysOnTop(val)
      }
    },
    methods: {
      newWindow: function () {
        console.log(11)
        ipc.send('newWindow')
      },
      onDrag: function (e) {
        e.preventDefault()
      },
      onDrop: function (e) {
        e.preventDefault()
        let fileList = e.dataTransfer.files
        const file = fileList[0]
        this.parseApk(file)
      },
      warning: function (msg) {
        remote.dialog.showMessageBox({
          type: 'warning',
          title: '提示',
          message: msg
          // detail: '232323'
        })
      },
      parseApk: function (apkFile) {
        const apkPath = apkFile.path

        let aaptDir = path.join(__static, 'aapt')
        let aaptFileName = ''
        switch (os.platform()) {
          case 'darwin':
            aaptFileName = 'aapt_darwin'
            break
          case 'linux':
            aaptFileName = 'aapt_linux'
            break
          case 'windows':
            aaptFileName = 'aapt.exe'
            break
          default:
            this.warning('不支持当前平台')
            return
        }
        exec(`"${path.join(aaptDir, aaptFileName)}" d badging "${apkPath}"`, (err, stdout, stderr) => {
          if (err) {
            console.log(stderr)
            this.warning('文件解析失败')
            return
          }
          this.parseInfo(stdout, apkFile)
        })
      },
      parseInfo: async function (stdout, apkFile) {
        // console.log(stdout)
        const apkPath = apkFile.path

        let search = stdout.search(`package: name='([^']+)' `)
        // console.log(search)

        // var reg1 = /package: name='([^']+)' /g
        // var reg1 = /uses-permission: name='([^']+)'/g
        const apkInfo = this.apkInfo
        apkInfo.name = this.regexpOne(stdout, /application-label-zh-CN:'([^']+)'/g) ||
          this.regexpOne(stdout, /application-label-zh:'([^']+)'/g) ||
          this.regexpOne(stdout, /label='([^']+)'/g)
        apkInfo.package = this.regexpOne(stdout, /package: name='([^']+)'/g)
        apkInfo.versionName = this.regexpOne(stdout, /versionName='([^']+)'/g)
        apkInfo.versionCode = this.regexpOne(stdout, /versionCode='([^']+)'/g)
        let minSdk = this.regexpOne(stdout, /sdkVersion:'([^']+)'/g)
        apkInfo.minSdk = `API${minSdk} ${VersionMap[minSdk] || ''}`

        let perList = this.regexpList(stdout, /uses-permission: name='android.permission\.([^']+)'/g)

        perList = [...new Set(perList)]
        console.log(perList.length)
        // console.log(apkInfo.permissionList)
        apkInfo.permissionList = perList.map(it => PermissionMap[it] ? `${PermissionMap[it]} - ${it}` : it)

        apkInfo.fileName = apkPath

        apkInfo.fileMD5 = md5File.sync(apkPath)

        const size = apkFile.size
        const formatB = Number(size).toLocaleString()
        let sizeStr = ''
        if (size > 1024 * 1024 * 1024) {
          sizeStr = `${formatB}字节 (${(size / (1024 * 1024 * 1024)).toFixed(2)}GB)`
        } else if (size > 1024 * 1024) {
          sizeStr = `${formatB}字节 (${(size / (1024 * 1024)).toFixed(2)}MB)`
        } else if (size > 1024) {
          sizeStr = `${formatB}字节 (${(size / (1024)).toFixed(2)}KB)`
        } else {
          sizeStr = `${formatB}字节 (${(size / (1)).toFixed(2)}B)`
        }
        apkInfo.fileSize = sizeStr

        let iconPath = this.regexpOne(stdout, /icon='([^']+)'/g)
        // console.log(iconPath)
        // console.log(path.join('/123123', iconPath))
        let tmpDir = os.tmpdir()
        tmpDir = path.join(tmpDir, 'top.nightfarmer.apkparser')
        if (!fs.existsSync(tmpDir)) {
          fs.mkdirSync(tmpDir)
        }
        if (!fs.existsSync(tmpDir)) {
          this.warning('临时文件夹创建失败')
          return
        }
        if (path.extname(iconPath) === '.xml') {
          apkInfo.icon = 'xml'
          return
        }
        await this.unzipIcon(apkPath, tmpDir, iconPath)
        let iconLocalPath = path.join(tmpDir, path.basename(iconPath))
        let iconBuf = fs.readFileSync(iconLocalPath)
        apkInfo.icon = 'data:image/png;base64,' + iconBuf.toString('base64')

        this.deleteFolder(tmpDir)
      },
      regexpOne: function (stdout, regExp) {
        let res = regExp.exec(stdout)
        return res ? res[1] : ''
      },
      regexpList: function (stdout, regExp) {
        let res = regExp.exec(stdout)
        const result = []
        while (res) {
          // console.log(res[1], regExp.lastIndex)
          result.push(res[1])
          res = regExp.exec(stdout)
        }
        return result
        // console.log('!!!', res, reg1.lastIndex)
        // res = reg1.exec(stdout)
        // console.log(res[1], reg1.lastIndex)
        // res = reg1.exec(stdout)
        // console.log(res[1], reg1.lastIndex)
      },
      unzipIcon: async function (zipPath, outPath, filePath) {
        return new Promise((resolve, reject) => {
          let unzipDir = path.join(__static, 'unzip')
          let unzipFileName = ''
          switch (os.platform()) {
            case 'darwin':
              unzipFileName = 'unzip_darwin'
              break
            case 'linux':
              unzipFileName = 'unzip_linux'
              break
            case 'windows':
              unzipFileName = 'unzip.exe'
              break
            default:
              this.warning('不支持当前平台')
              return
          }
          let command = `"${path.join(unzipDir, unzipFileName)}" "${zipPath}" "${outPath}" "${filePath}"`
          // console.log('解压命令 ', command)
          exec(command, (err, stdout, stderr) => {
            if (err) {
              console.log(stderr)
              this.warning('图标解压失败')
              reject(err)
              return
            }
            resolve()
          })
        })
      },
      deleteFolder: function (path2Del) {
        if (fs.existsSync(path2Del)) {
          fs.readdirSync(path2Del).forEach(function (file) {
            const curPath = path.join(path2Del, file)
            if (fs.statSync(curPath).isDirectory()) { // recurse
              this.deleteFolder(curPath)
            } else { // delete file
              fs.unlinkSync(curPath)
            }
          })
          fs.rmdirSync(path2Del)
        }
      }
    },
    created () {
      this.windowTop = remote.BrowserWindow.getFocusedWindow().isAlwaysOnTop()
    }
  }
</script>

<style>
    /* CSS */

    html, body {
        padding: 0;
        margin: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
        font-size: 12px;
        user-select: none;
        cursor: default;

        width: 100vw;
        height: 100vh;

        background: #fafafa;

        /*display: flex;*/
        /*align-items: stretch;*/
    }

    .main {
        position: absolute;
        top: 15px;

        flex: 1;
        background: #fafafa;
        /*width: 100vw;*/
        /*height: 100vh;*/
        display: flex;
        flex-direction: column;
        align-items: stretch;

    }

    .row {
        margin: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .label {
        width: 80px;
        text-align: center;
    }

    .icon {
        width: 56px;
        height: 56px;
    }

    .icon_border {
        width: 56px;
        height: 56px;
        border-style: solid;
        border-width: 1px;
        border-color: #dfdfdf;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 11px;
        background: white;
    }

    input {
        width: 220px;
        height: 20px;
        border-width: 1px;
        border-color: #dfdfdf;
        border-style: solid;
        padding-left: 5px;

        cursor: text;
    }

    .permission_list {
        width: 225px;
        height: 100px;
        border-width: 1px;
        border-color: #dfdfdf;
        border-style: solid;

        display: flex;
        flex-direction: column;
        overflow-y: auto;

        font-size: 10px;

        background: white;
    }

    .permission_list_item {
        padding-left: 5px;

        border-style: solid;
        border-width: 0;
        border-bottom-width: 1px;
        border-color: #EEEEEE;

        padding-top: 5px;
        padding-bottom: 5px;
    }

    .permission_list_item:hover {
        background: rgba(26, 173, 134, 0.36);
    }

    input::selection {
        color: white;
        background: rgba(26, 173, 134, 0.8);
    }

    .checkbox_area {
        display: flex;
        flex-direction: row;
        align-items: center;
        /*width: 100px;*/
        align-self: flex-end;
        margin-right: 10px;
        margin-top: 10px;

        cursor: pointer;
    }

</style>
