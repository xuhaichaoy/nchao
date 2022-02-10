import { Menu, Tray } from "electron";
import path from "path";
let appTray = null;

// 隐藏主窗口，并创建托盘，绑定关闭事件
export const setTray = (app, mainWindow) => {
  // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区
  // 通常被添加到一个 context menu 上.
  // 系统托盘右键菜单
  const trayMenuTemplate = [
    {
      // 系统托盘图标目录
      label: "退出",
      click: () => {
        app.quit();
      },
    },
  ];
  // 设置系统托盘图标
  const iconPath = path.join(__dirname, "./images/icon.ico");

  appTray = new Tray(iconPath);

  // 图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  // 展示主窗口，隐藏主窗口 mainWindow.hide()
  mainWindow.show();

  // 设置托盘悬浮提示
  appTray.setToolTip("never forget");

  // 设置托盘菜单
  appTray.setContextMenu(contextMenu);

  // 单击托盘小图标显示应用
  appTray.on("click", () => {
    // 显示主程序
    mainWindow.show();
    // 关闭托盘显示
    // appTray.destroy();
  });

  return appTray;
};
