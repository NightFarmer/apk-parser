## Introduction

This is a desktop tool based on electron, vue, golang for parsing apk files. It supports Mac, Linux and Windows across platforms.  
Use Golang to parse the apk icon at high speed.  
Built-in aapt parsing apk information.

([文档还是中文的好](/NightFarmer/apk-parser/blob/master/README.md))

## Screenshot

<table>
    <tr align="center">
        <td><b>Mac</b></td>
        <td><b>Linux</b></td>
    </tr>
    <tr valign="top" align="center">
        <td width="50%"><img  src="https://github.com/NightFarmer/apk-parser/blob/master/screenshot/on-mac-en.png?raw=true"/></td>
        <td width="50%"><img  src="https://github.com/NightFarmer/apk-parser/blob/master/screenshot/on-linux.png?raw=true"/></td>
    </tr>
    <tr align="center">
        <td><b>Windows</b></td>
        <td><b>operate</b></td>
    </tr>
    <tr valign="top" align="center">
        <td width="50%"><img  src="https://github.com/NightFarmer/apk-parser/blob/master/screenshot/on-windows.png?raw=true"/></td>
        <td width="50%"><img  src="https://github.com/NightFarmer/apk-parser/blob/master/screenshot/apk-parser-mac-en.gif?raw=true"/></td>
    </tr>
</table>

## Download

**[To Download](https://github.com/NightFarmer/apk-parser/releases)**

## Source code construction

Source code build requires NodeJs environment, download and install on [NodeJs website](https://nodejs.org/) or use [NVM](https://github.com/creationix/nvm) to install.
    
The decompression command is written in Golang and built into the /static/unzip folder, so there is no need to prepare the Golang development environment.


### Installation dependence

``` bash
cnpm install 或 yarn
```

### Run

``` bash
cnpm run dev or yarn dev

```

### Build

``` bash
# to build on current platform
cnpm run build or yarn build

# to build on all platform
cnpm run build:all or yarn build:all

# to build on macOS
cnpm run build:mac or yarn build:mac

# to build on linux
cnpm run build:linux or yarn build:linux

# to build on windows
cnpm run build:win or yarn build:win
```

---

