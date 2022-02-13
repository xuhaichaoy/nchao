import { app, screen, globalShortcut, nativeImage } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { insertTable, delTable } from "./core/db/sqlite";
import fileLists from "./core/search/win";
import getAppIcon from "./core/search/mac";
import { setTray } from "./helpers/api/index";
import { localdatafile } from "../utils/getLocalDataFile";
import path from "path";
import fs from "fs";

const configPath = path.join(localdatafile(), "./mynextron-plugin.json");

const isProd: boolean = process.env.NODE_ENV === "production";

const darwin: boolean = process.platform === "darwin";

const window: boolean = process.platform === "win32";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  let data = [];
  let localPlugin = [];
  if (window) {
    data = await fileLists();
  }else if(darwin) {
    data = await getAppIcon(nativeImage);
  }

  try {
    localPlugin = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    delTable();
    insertTable(data);
    insertTable(localPlugin);
  }, 5000);

  const mainWindow = createWindow("main", {
    width: 800,
    height: 66,
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    fullscreenable: false,
    maximizable: false,
    center: false,
    opacity: 0,
    resizable: false,
    backgroundColor: "transparent",
    x: Math.ceil(width / 2 - 400),
    y: Math.ceil(height / 2 - 233),
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
    mainWindow.webContents.closeDevTools();
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
  // TODO
  // Mac 下 设置托盘图标报错
  setTray(app, mainWindow);
  

  globalShortcut.register("Alt+W", function () {
    if (mainWindow.isVisible()) {
      mainWindow.setOpacity(0);
      mainWindow.hide();
    } else {
      mainWindow.setOpacity(1);
      mainWindow.show();
      mainWindow.webContents.send("onfocus", true);
    }
  });


  globalShortcut.register("CommandOrControl+E", function () {
    if (mainWindow.isVisible()) {
      mainWindow.setOpacity(0);
      mainWindow.hide();
    } else {
      mainWindow.setOpacity(1);
      mainWindow.show();
      mainWindow.webContents.send("onfocus", true);
    }
  });

  console.log(globalShortcut.isRegistered('CommandOrControl+E'))

  app.on("browser-window-blur", () => {
    if (isProd) {
      mainWindow.hide();
    }
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});
