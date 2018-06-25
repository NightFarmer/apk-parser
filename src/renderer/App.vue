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
            <!--<div>-->
                <div class="icon_border" v-if="apkInfo.icon==='xml'">不支持<br/>预览</div>
                <div class="icon_border" v-else-if="!apkInfo.icon"></div>
                <img :src="apkInfo.icon" class="icon" v-else=""/>
            <!--</div>-->
        </div>
        <svg t="1529918495155" class="github_icon"
             viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.714286 512q0 143.433143-83.712 258.011429t-216.283429 158.573714q-15.433143 2.852571-22.564571-3.986286t-7.131429-17.152l0-120.576q0-55.442286-29.696-81.152 32.585143-3.437714 58.587429-10.276571t53.723429-22.272 46.299429-37.997714 30.281143-60.013714 11.702857-86.016q0-69.156571-45.129143-117.723429 21.138286-52.004571-4.571429-116.553143-16.018286-5.156571-46.299429 6.290286t-52.553143 25.161143l-21.723429 13.714286q-53.138286-14.848-109.714286-14.848t-109.714286 14.848q-9.142857-6.290286-24.283429-15.433143t-47.725714-22.016-49.152-7.716571q-25.161143 64.585143-3.986286 116.553143-45.129143 48.566857-45.129143 117.723429 0 48.566857 11.702857 85.723429t29.988571 60.013714 46.006857 38.290286 53.723429 22.272 58.587429 10.276571q-22.857143 20.553143-28.013714 58.843429-11.995429 5.705143-25.709714 8.557714t-32.585143 2.852571-37.412571-12.288-31.707429-35.730286q-10.861714-18.285714-27.721143-29.696t-28.269714-13.714286l-11.446857-1.718857q-11.995429 0-16.566857 2.56t-2.852571 6.582857 5.156571 8.009143 7.424 6.838857l3.986286 2.852571q12.580571 5.705143 24.868571 21.723429t17.993143 29.147429l5.705143 13.129143q7.424 21.723429 25.161143 35.145143t38.290286 17.152 39.716571 3.986286 31.707429-2.011429l13.129143-2.304q0 21.723429 0.292571 50.870857t0.292571 30.866286q0 10.276571-7.424 17.152t-22.857143 3.986286q-132.571429-43.995429-216.283429-158.573714t-83.712-258.011429q0-119.442286 58.843429-220.269714t159.707429-159.707429 220.269714-58.843429 220.269714 58.843429 159.707429 159.707429 58.843429 220.269714z"
                  fill="#dddddd"
            >
            </path>
        </svg>

        <svg t="1529918495155" class="github_icon github_icon_mask" @click="openGitHub"
             viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.714286 512q0 143.433143-83.712 258.011429t-216.283429 158.573714q-15.433143 2.852571-22.564571-3.986286t-7.131429-17.152l0-120.576q0-55.442286-29.696-81.152 32.585143-3.437714 58.587429-10.276571t53.723429-22.272 46.299429-37.997714 30.281143-60.013714 11.702857-86.016q0-69.156571-45.129143-117.723429 21.138286-52.004571-4.571429-116.553143-16.018286-5.156571-46.299429 6.290286t-52.553143 25.161143l-21.723429 13.714286q-53.138286-14.848-109.714286-14.848t-109.714286 14.848q-9.142857-6.290286-24.283429-15.433143t-47.725714-22.016-49.152-7.716571q-25.161143 64.585143-3.986286 116.553143-45.129143 48.566857-45.129143 117.723429 0 48.566857 11.702857 85.723429t29.988571 60.013714 46.006857 38.290286 53.723429 22.272 58.587429 10.276571q-22.857143 20.553143-28.013714 58.843429-11.995429 5.705143-25.709714 8.557714t-32.585143 2.852571-37.412571-12.288-31.707429-35.730286q-10.861714-18.285714-27.721143-29.696t-28.269714-13.714286l-11.446857-1.718857q-11.995429 0-16.566857 2.56t-2.852571 6.582857 5.156571 8.009143 7.424 6.838857l3.986286 2.852571q12.580571 5.705143 24.868571 21.723429t17.993143 29.147429l5.705143 13.129143q7.424 21.723429 25.161143 35.145143t38.290286 17.152 39.716571 3.986286 31.707429-2.011429l13.129143-2.304q0 21.723429 0.292571 50.870857t0.292571 30.866286q0 10.276571-7.424 17.152t-22.857143 3.986286q-132.571429-43.995429-216.283429-158.573714t-83.712-258.011429q0-119.442286 58.843429-220.269714t159.707429-159.707429 220.269714-58.843429 220.269714 58.843429 159.707429 159.707429 58.843429 220.269714z"
                  fill="#1aad86"
            >
            </path>
        </svg>

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
  import electron, {remote, ipcRenderer as ipc, BrowserWindow, shell} from 'electron'
  import path from 'path'
  import {exec} from 'child_process'
  import md5File from 'md5-file'
  import PermissionMap from '../dict/PermissionMap'
  import VersionMap from '../dict/VersionMap'
  import os from 'os'
  import fs from 'fs'
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
      openGitHub: function () {
        shell.openExternal('https://github.com/NightFarmer/apk-parser')
      },
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
        /*bottom: 0px;*/

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
        /*width: 56px;*/
        width: auto;
        height: 56px;
    }

    .icon_border {
        width: 54px;
        height: 54px;
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

    .github_icon {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        fill: currentColor;
        overflow: hidden;

        position: absolute;
        left: 30px;
        bottom: -3px;

        cursor: pointer;
        transition-duration: 0.3s;
    }

    .github_icon_mask {
        transition-duration: 0.3s;
        opacity: 0;
    }

    .github_icon_mask:hover {
        opacity: 1;
    }
</style>
