import { ipcMain, shell } from "electron";
import { readAllRows } from "../sqlite";
import { execSync } from "child_process";

ipcMain.on("handleSearchValue", async (event, arg) => {
  const sql = `select simple_highlight(local, 6, '[', ']') as info, rowid as id, * from local where keyWords match simple_query('${arg}') order by rank`;
  const data = await readAllRows(sql);
  event.reply("getSearchValue", data);
});

ipcMain.on("handleOpenVlaue", async (event, arg) => {
  if (arg.pluginType === "app") {
    execSync(arg.action);
  }
});
