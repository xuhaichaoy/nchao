import { BrowserWindow } from "electron";
import { ipcMain, shell } from "electron";
import { readAllRows } from "../sqlite";
import { execSync } from "child_process";

export const handleIpc = (win: BrowserWindow) => {
  ipcMain.on("handleSearchValue", async (event, arg) => {
    const sql = `select simple_highlight(local, 6, '[', ']') as info, rowid as id, * from local where keyWords match simple_query('${arg}') order by rank`;
    const data = await readAllRows(sql);
    event.reply("getSearchValue", data);
  });

  ipcMain.on("handleOpenVlaue", async (_event, arg) => {
    if (arg.pluginType === "app") {
      execSync(arg.action);
    }
  });

  ipcMain.on("MainProgress", function (e, argMsg) {
    console.log(argMsg);
  });

  ipcMain.on("setWindowSize", async (_event, arg) => {
    console.log(arg);
    win.setContentSize(800, arg);
  });
};
