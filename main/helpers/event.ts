import { ipcMain, shell, screen, BrowserWindow } from "electron";
import { readAllRows } from "../core/db/sqlite";
import { execSync } from "child_process";
import { runner, detach } from "../browsers";
import pluginClickEvent from "../core/plugin/clickplugin";
import { setInterval } from "timers";

const runnerInstance = runner();

let winStartPosition = { x: 0, y: 0 };
let mouseStartPosition = { x: 0, y: 0 };
let movingInterval = null;

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

  ipcMain.on("window-move-open", (_events, canMoving) => {
    if (canMoving) {
      const winPosition = win.getPosition();
      winStartPosition = { x: winPosition[0], y: winPosition[1] };
      mouseStartPosition = screen.getCursorScreenPoint();
      if (movingInterval) {
        clearInterval(movingInterval);
        // cancelIdleCallback(movingInterval)
      }

      // movingInterval = requestIdleCallback(() => {
      //   const cursorPosition = screen.getCursorScreenPoint();
      //   const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
      //   const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
      //   win.setPosition(x, y, true);
      // })

      movingInterval = setInterval(() => {
        const cursorPosition = screen.getCursorScreenPoint();
        const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
        const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
        win.setPosition(x, y, true);
      }, 0);
    } else {
      // cancelIdleCallback(movingInterval)
      clearInterval(movingInterval);
      movingInterval = null;
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

  ipcMain.on("openPlugin", async (event, { plugin }) => {
    // if (API.currentPlugin && API.currentPlugin.name === plugin.name) return;
    win.setSize(win.getSize()[0], 60);
    // runnerInstance.removeView(win);

    runnerInstance.init(plugin, win);
    pluginClickEvent({
      plugin,
      ...plugin,
    });

    // API.currentPlugin = plugin;
    // win.webContents.executeJavaScript(
    //   `win.setCurrentPlugin(${JSON.stringify({
    //     currentPlugin: API.currentPlugin,
    //   })})`
    // );
    // win.show();
    // 按 ESC 退出插件
    // win.webContents.on("before-input-event", (event, input) =>
    //   API.__EscapeKeyDown(event, input, window)
    // );
    // runnerInstance
    //   .getView()
    //   .webContents.on("before-input-event", (event, input) =>
    //     API.__EscapeKeyDown(event, input, window)
    //   );
  });
};
