<template>
    <div class="main"
         @dragenter="onDrag"
         @dragover="onDrag"
         @drop="onDrop"
    >
        <div class="container">
            <div class="row">
                <div class="label">
                    {{labels.icon}}
                </div>
                <div class="icon_border" v-if="!!apkInfo.iconErr">{{apkInfo.iconErr}}</div>
                <div class="icon_border" v-else-if="!apkInfo.icon"></div>
                <img :src="apkInfo.icon" class="icon" v-else=""/>
            </div>

            <div class="new_window_button" @click="newWindow">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" class="new_window_icon">
                    <path d="M887.466667 467.057778 591.644444 467.057778c-18.864356 0-34.133333 15.291733-34.133333 34.133333s15.268978 34.133333 34.133333 34.133333l213.424356 0L500.394667 839.998578c-13.334756 13.334756-13.334756 34.952533 0 48.264533 13.334756 13.334756 34.952533 13.334756 48.264533 0L853.333333 583.588978l0 213.424356c0 18.864356 15.291733 34.133333 34.133333 34.133333 18.864356 0 34.133333-15.268978 34.133333-34.133333l0-295.822222C921.6 482.349511 906.331022 467.057778 887.466667 467.057778zM876.088889 347.3408 876.088889 216.769422c0-50.289778-40.7552-91.044978-91.022222-91.044978l-591.644444 0c-50.267022 0-91.022222 40.7552-91.022222 91.044978l0 523.355022c0 50.267022 40.7552 91.022222 91.022222 91.022222l204.8 0 0-0.091022c18.409244-0.500622 33.200356-15.519289 33.200356-34.042311s-14.791111-33.541689-33.200356-34.042311l0-0.091022-182.044444 0c-25.122133 0-45.511111-20.388978-45.511111-45.511111l0-386.844444 637.155556 0 0 18.136178c-0.045511 0.728178-0.227556 1.4336-0.227556 2.207289 0 19.0464 15.428267 34.429156 34.429156 34.429156s34.429156-15.382756 34.429156-34.429156C876.452978 349.661867 876.202667 348.501333 876.088889 347.3408zM807.822222 285.013333l-637.155556 0 0-45.511111c0-25.122133 20.388978-45.511111 45.511111-45.511111l546.133333 0c25.122133 0 45.511111 20.388978 45.511111 45.511111L807.822222 285.013333z"
                          fill="#666666"
                    >
                    </path>
                </svg>
                {{labels.newWindow}}
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
                    {{labels.package}}
                </div>
                <div>
                    <input v-model="apkInfo.package" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
                </div>
            </div>

            <div class="row">
                <div class="label">
                    {{labels.name}}
                </div>
                <div>
                    <input v-model="apkInfo.name" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
                </div>
            </div>

            <div class="row">
                <div class="label">
                    {{labels.versionName}}
                </div>
                <div>
                    <input v-model="apkInfo.versionName" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
                </div>
            </div>

            <div class="row">
                <div class="label">
                    {{labels.versionCode}}
                </div>
                <div>
                    <input v-model="apkInfo.versionCode" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
                </div>
            </div>

            <div class="row">
                <div class="label">
                    {{labels.minSdk}}
                </div>
                <div>
                    <input v-model="apkInfo.minSdk" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
                </div>
            </div>

            <div class="row">
                <div class="label">
                    {{labels.fileName}}
                </div>
                <div>
                    <input v-model="apkInfo.fileName" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
                </div>
            </div>


            <div class="row">
                <div class="label">
                    {{labels.fileSize}}
                </div>
                <div>
                    <input v-model="apkInfo.fileSize" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
                </div>
            </div>

            <div class="row">
                <div class="label">
                    {{labels.fileMD5}}
                </div>
                <div>
                    <input v-model="apkInfo.fileMD5" readonly="readonly" @dblclick="(e)=>e.target.select()"/>
                </div>
            </div>


            <div class="row">
                <div class="label">
                    {{labels.permission}}
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
                <span>{{labels.winTop}}</span>
            </div>
        </div>

        <div class="toast_container" v-if="!apkInfo.package">
            <div class="toast_mask"></div>
            <div class="toast_info">{{labels.dragFileTip}}</div>
        </div>
    </div>
</template>

<script>
  import {remote, ipcRenderer as ipc, BrowserWindow, shell} from 'electron'
  import {exec} from 'child_process'
  import md5File from 'md5-file'
  import PermissionMap from '../dict/PermissionMap'
  import VersionMap from '../dict/VersionMap'
  import CheckBox from './components/CheckBox'
  import LocaleStrings from '../dict/LocaleStrings'

  const PrimaryColor = '#1aad86'

  export default {
    name: 'apk-parser',
    components: {
      CheckBox
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
          permissionList: [],

          iconErr: ''
        },
        windowTop: false
      }
    },
    computed: {
      labels: function () {
        return this.isEN ? LocaleStrings.en : LocaleStrings.zh
      },
      isEN: function () {
        let locale = remote.app.getLocale()
        return locale && locale.indexOf('zh') === -1
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
        ipc.send('newWindow')
      },
      onDrag: function (e) {
        e.preventDefault()
      },
      onDrop: function (e) {
        e.preventDefault()
        let fileList = e.dataTransfer.files
        const file = fileList[0]
        const infoResult = ipc.sendSync('parseApk', file.path)
        if (infoResult.errMsg) {
          this.warning(infoResult.errMsg)
          return
        }
        infoResult && this.parseInfo(infoResult, file)
      },
      warning: function (msg) {
        remote.dialog.showMessageBox(remote.getCurrentWindow(), {
          type: 'warning',
          title: this.labels.warning,
          message: msg
          // detail: '232323'
        })
      },
      parseInfo: async function (stdout, apkFile) {
        const apkInfo = this.apkInfo
        const apkPath = apkFile.path

        apkInfo.name = this.regexpOne(stdout, /application-label-zh-CN:'([^']+)'/g) ||
          this.regexpOne(stdout, /application-label-zh:'([^']+)'/g) ||
          this.regexpOne(stdout, /label='([^']+)'/g)
        apkInfo.package = this.regexpOne(stdout, /package: name='([^']+)'/g)
        apkInfo.versionName = this.regexpOne(stdout, /versionName='([^']+)'/g)
        apkInfo.versionCode = this.regexpOne(stdout, /versionCode='([^']+)'/g)
        let minSdk = this.regexpOne(stdout, /sdkVersion:'([^']+)'/g)
        apkInfo.minSdk = `API${minSdk} ${VersionMap[minSdk] || ''}`

        let perList = this.regexpList(stdout, /uses-permission: name='android.permission\.([^']+)'/g)
        if (!perList || !perList.length) {
          perList = this.regexpList(stdout, /uses-permission:'android.permission\.([^']+)'/g)
        }

        perList = [...new Set(perList)]
        if (this.isEN) {
          apkInfo.permissionList = perList
        } else {
          apkInfo.permissionList = perList.map(it => PermissionMap[it] ? `${PermissionMap[it]} - ${it}` : it)
        }
        apkInfo.fileName = apkPath
        apkInfo.fileMD5 = md5File.sync(apkPath)

        const size = apkFile.size
        const formatB = Number(size).toLocaleString()
        let sizeStr = ''
        if (size > 1024 * 1024 * 1024) {
          sizeStr = `${formatB}${this.labels.byte} (${(size / (1024 * 1024 * 1024)).toFixed(2)}GB)`
        } else if (size > 1024 * 1024) {
          sizeStr = `${formatB}${this.labels.byte} (${(size / (1024 * 1024)).toFixed(2)}MB)`
        } else if (size > 1024) {
          sizeStr = `${formatB}${this.labels.byte} (${(size / (1024)).toFixed(2)}KB)`
        } else {
          sizeStr = `${formatB}${this.labels.byte} (${(size / (1)).toFixed(2)}B)`
        }
        apkInfo.fileSize = sizeStr

        let iconPath = this.regexpOne(stdout, /icon='([^']+)'/g)

        let iconData = ipc.sendSync('unzipIcon', apkPath, iconPath)
        if (!iconData.errMsg) {
          apkInfo.icon = iconData
          apkInfo.iconErr = null
        } else {
          apkInfo.iconErr = iconData.errMsg
        }
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
      }
    },
    mounted () {
      let focusedWindow = remote.BrowserWindow.getFocusedWindow()
      this.windowTop = !!(focusedWindow && focusedWindow.isAlwaysOnTop())
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

        overflow: hidden;
    }

    .main {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .container {
        position: absolute;
        top: 15px;
        /*bottom: 0px;*/

        flex: 1;
        background: #fafafa;
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

        font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
        font-size: 11.2px;
        letter-spacing: .15px;
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

    .new_window_button {
        position: absolute;
        right: 0;
        top: 7px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border-radius: 4px;
        font-size: 10px;
        color: #666666;

        height: 35px;
        padding: 6px 10px;
    }

    .new_window_button:active {
        background: white;
    }

    .new_window_icon {
        width: 20px;
        height: 20px;
    }

    .toast_container {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        pointer-events: none;
    }

    .toast_mask {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #999999;
        opacity: 0.1;

        pointer-events: none;
    }

    .toast_info {
        z-index: 10;
        background: white;
        font-size: 18px;
        margin-bottom: 20px;
        padding: 10px;
        border-radius: 5px;

        pointer-events: auto;
    }
</style>
