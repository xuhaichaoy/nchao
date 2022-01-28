import { app, screen } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { insertTable, delTable } from "./core/db/sqlite";
import fileLists from "./core/search/win";
import { setTray } from "./helpers/api/index";

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
  console.log(data);

  setTimeout(() => {
    delTable();
    insertTable(data);
  }, 2000);

  console.log(screen);

  const mainWindow = createWindow("main", {
    width: 800,
    height: 66,
    frame: false,
    fullscreenable: false,
    maximizable: false,
    center: false,
    resizable: false,
    backgroundColor: "white",
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
})();

app.on("window-all-closed", () => {
  app.quit();
});
