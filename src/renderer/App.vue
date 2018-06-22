<template>
    <div id="app" class="main"
         @dragenter="onDrag"
         @dragover="onDrag"
         @drop="onDrop"
    >
        <!--<landing-page></landing-page>-->
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

    </div>
</template>

<script>
  // import LandingPage from '@/components/LandingPage'
  import electron, {remote, ipcRenderer} from 'electron'
  import path from 'path'
  import {exec} from 'child_process'
  import md5File from 'md5-file'
  import PermissionMap from '../dict/PermissionMap'
  // let childProcess = require('child_process')

  // const {dialog} = require('electron')
  // console.log(electron)
  export default {
    name: 'apk-parser',
    components: {
      // LandingPage
    },
    data: function () {
      return {
        apkInfo: {
          package: '',
          name: '',
          versionName: '',
          versionCode: '',
          minSdk: '',
          fileName: '',
          fileSize: '',
          fileMD5: '',
          permissionList: []
        }
      }
    },
    methods: {
      onDrag: function (e) {
        e.preventDefault()
      },
      onDrop: function (e) {
        e.preventDefault()
        // console.log(e)
        let fileList = e.dataTransfer.files
        // console.log(fileList)
        const file = fileList[0]
        console.log(file.name)
        console.log(file.size)
        console.log(file.path)
        this.parseApk(file)
        // ipcRenderer.send('ondragstart', '/path/to/item')
        // return false
      },
      warning: function (msg) {
        remote.dialog.showMessageBox({
          type: 'warning',
          title: '提示',
          message: msg
          // detail: '232323'
        })
      },
      parseApk: function (file) {
        const apkPath = file.path
        exec(`${path.join(__static, 'aapt')} d badging ${apkPath}`, (err, stdout, stderr) => {
          if (err) {
            console.log(stderr)
            this.warning('文件解析失败')
            return
          }
          this.parseInfo(stdout, file)
        })
      },
      parseInfo: function (stdout, file) {
        // console.log(stdout)
        let search = stdout.search(`package: name='([^']+)' `)
        console.log(search)

        // var reg1 = /package: name='([^']+)' /g
        // var reg1 = /uses-permission: name='([^']+)'/g
        const apkInfo = this.apkInfo
        apkInfo.name = this.regexpOne(stdout, /application-label-zh-CN:'([^']+)'/g) ||
          this.regexpOne(stdout, /application-label-zh:'([^']+)'/g) ||
          this.regexpOne(stdout, /label='([^']+)'/g)
        apkInfo.package = this.regexpOne(stdout, /package: name='([^']+)'/g)
        apkInfo.versionName = this.regexpOne(stdout, /versionName='([^']+)'/g)
        apkInfo.versionCode = this.regexpOne(stdout, /versionCode='([^']+)'/g)
        apkInfo.minSdk = this.regexpOne(stdout, /sdkVersion:'([^']+)'/g)
        const perList = this.regexpList(stdout, /uses-permission: name='android.permission\.([^']+)'/g)

        console.log(apkInfo.permissionList)
        apkInfo.permissionList = perList.map(it => PermissionMap[it] ? `${PermissionMap[it]} - ${it}` : it)

        apkInfo.fileName = file.path

        apkInfo.fileMD5 = md5File.sync(file.path)

        const size = file.size
        const formatB = size
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
      doTest: function () {
        // console.log(electron)
        // remote.dialog.showMessageBox({
        //   type: 'warning',
        //   title: '提示',
        //   message: '233',
        //   detail: '232323'
        // })

        // console.log(remote.app.getVersion())
        // console.log(remote.dialog)
        // console.log(remote.dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
        const fs = require('fs')
        console.log(__static)
        const root = fs.readdirSync(__static)
        console.log(root)

        console.log(path.join(__static, 'aapt'))
      }
    },
    mounted () {
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
        background: #edfaea;

        width: 100vw;
        height: 100vh;

        display: flex;
        align-items: stretch;
    }

    .main {
        flex: 1;
        background: #ffffff;
        /*width: 100vw;*/
        /*height: 100vh;*/
        display: flex;
        flex-direction: column;

        padding: 10px;
    }

    .row {
        margin: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .label {
        width: 22vw;
        text-align: center;
    }

    input {
        width: 220px;
        height: 20px;
        border-width: 1px;
        border-color: #bdbdbd;
        border-style: solid;
        padding-left: 5px;

        cursor: text;
    }

    .permission_list {
        width: 225px;
        height: 100px;
        border-width: 1px;
        border-color: #bdbdbd;
        border-style: solid;

        display: flex;
        flex-direction: column;
        overflow-y: auto;

        font-size: 10px;
    }

    .permission_list_item {
        padding-left: 5px;

        border-style: solid;
        border-width: 0;
        border-bottom-width: 1px;
        border-color: #DDDDDD;

        padding-top: 5px;
        padding-bottom: 5px;
    }
</style>
