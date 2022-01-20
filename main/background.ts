import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { insertTable, delTable } from "./sqlite";
import fileLists from "./win";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  let data = await fileLists();
  console.log(data);

  setTimeout(() => {
    delTable();
    insertTable(data);
  }, 2000);

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
