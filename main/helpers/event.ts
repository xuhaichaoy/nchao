import { BrowserWindow } from "electron";
import { ipcMain, shell } from "electron";
import { readAllRows } from "../core/db/sqlite";
import { execSync } from "child_process";

export const handleIpc = (win: BrowserWindow) => {
  ipcMain.on("handleSearchValue", async (event, arg) => {
    if (arg === "aa") {
      const sql = `select rowid as id, * from local`;
      const data = await readAllRows(sql);
      event.reply("getSearchValue", data);
      return;
    }
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
    win.setContentSize(800, arg || 66);
  });

  ipcMain.on("msg-trigger", async (event, arg) => {
    const window = arg.winId ? BrowserWindow.fromId(arg.winId) : win;
    // const data = await API[arg.type](arg, window, event);
    // event.returnValue = data;
    event.returnValue = "1";
    // event.sender.send(`msg-back-${arg.type}`, data);
  });

  ipcMain.on("close", async () => {
    win.hide();
  });
};
