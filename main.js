const {app, BrowserWindow, ipcMain, shell} = require('electron')
const storage = require("electron-json-storage")
const path = require('path')
const memoryjs = require('memoryjs');
storage.setDataPath()

console.log(storage.getDataPath())
storage.get('config', (_, data) => {
  if (JSON.stringify(data) === "{}") {
    storage.set("config", {
      CameraBase: "0x32B9548",
      CameraOffset: "0x38E0",
      FOVOffset: "0x40"
    })
  }
})

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
      preload: path.join(__dirname, "preload.js")
    }
  })
  mainWindow.setMenu(null);
  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools();

  mainWindow.webContents.setWindowOpenHandler(({url}) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  else {
    store.clearMainBindings(ipcMain);
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})



ipcMain.on('get_config', () => {
  storage.get('config', (_, data) => {
      mainWindow.send('handle', {
        success: true,
        message: data,
      })
  })

})
ipcMain.on('revert', () => {
  storage.set("config", {
    CameraBase: "0x32B9548",
    CameraOffset: "0x38E0",
    FOVOffset: "0x40"
  })
  
})
ipcMain.on("write", (_, message) => {
  storage.set("config", {
    CameraBase: config.CameraBase,
    CameraOffset: config.CameraOffset
  })
})

let int;
let prc;
setTimeout(() => {

  int = setInterval(() => {

    if (prc) {
      let t = memoryjs.openProcess("WowClassic.exe")
      if (t) {
        mainWindow.send("search", true)
        memoryjs.closeProcess(t.handle)
        return;
      }
      else {
        mainWindow.send("search", false)
        t = null;
        return;
      }
    }
    if (!prc) {
      prc = memoryjs.openProcess("WowClassic.exe")
    mainWindow.send("search", prc ? true : false)
    }
  }, 2000)

}, 1500)


ipcMain.on("change_fov", (_, fov) => {
  let {CameraBase, CameraOffset, FOVOffset} = storage.getSync('config')

  console.log(CameraBase, CameraOffset, FOVOffset, storage.getSync('config'))

  if (prc && CameraBase && CameraOffset && FOVOffset) {

    const p1 = memoryjs.readMemory(prc.handle,prc.modBaseAddr + +CameraBase, memoryjs.PTR);
  const p2 = memoryjs.readMemory(prc.handle, p1 + +CameraOffset, memoryjs.PTR)
  memoryjs.writeMemory(prc.handle, p2 + +FOVOffset, +fov, "float")
  console.log(fov)
  }

})