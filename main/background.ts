import { app, screen, globalShortcut } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { insertTable, delTable } from "./core/db/sqlite";
import fileLists from "./core/search/win";
import { setTray } from "./helpers/api/index";
import { localdatafile } from "../utils/getLocalDataFile";
import path from "path";
import fs from "fs";
import log from "electron-log";

// declare const __static: string;

const configPath = path.join(localdatafile(), "./mynextron-plugin.json");

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  console.log(width, height);

  let data = await fileLists();
  let localPlugin = [];

  log.info(data);

  try {
    localPlugin = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    delTable();
    insertTable(data);
    insertTable(localPlugin);
  }, 1000);

  console.log(screen);

  const mainWindow = createWindow("main", {
    width: 800,
    height: 66,
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    fullscreenable: false,
    maximizable: false,
    center: false,
    resizable: false,
    backgroundColor: "transparent",
    x: width / 2 - 400,
    y: height / 2 - 333,
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
  setTray(app, mainWindow);
  globalShortcut.register("Alt+W", function () {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});
