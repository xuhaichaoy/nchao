import { ipcMain } from "electron";
import { readAllRows } from "../sqlite";

ipcMain.on("asynchronous-message", async (event, arg) => {
  const sql = `select simple_highlight(local, 6, '[', ']') as info, rowid as id, * from local where keyWords match simple_query('${arg}') order by rank`;
  const data = await readAllRows(sql);
  event.reply("asynchronous-reply", data);
});
