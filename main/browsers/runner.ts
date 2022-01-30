import { BrowserView, BrowserWindow, session, app } from "electron";
import path from "path";
import { windows, dev } from "../../utils/commonConst";

const __static: string = path.join(__dirname, "/static").replace(/\\/g, "\\\\");
const appPath = app.getPath("cache");
const baseDir = path.join(appPath, "./rubick-plugins");

const getRelativePath = (indexPath) => {
  return windows()
    ? indexPath.replace("file://", "")
    : indexPath.replace("file:", "");
};

const getPreloadPath = (plugin, pluginIndexPath) => {
  const { name, preload, tplPath, indexPath } = plugin;
  if (!preload) return;
  if (dev()) {
    if (name === "rubick-system-feature") {
      return path.resolve(__static, `../feature/public/preload.js`);
    }
    if (tplPath) {
      return path.resolve(getRelativePath(indexPath), `./`, preload);
    }
    return path.resolve(getRelativePath(pluginIndexPath), `../`, preload);
  }
  if (tplPath) {
    return path.resolve(getRelativePath(indexPath), `./`, preload);
  }
  return path.resolve(getRelativePath(pluginIndexPath), `../`, preload);
};

export const runner = () => {
  let view;

  const init = (plugin, window: BrowserWindow) => {
    if (view === null || view === undefined) {
      createView(plugin, window);
    }
  };

  const createView = (plugin, window: BrowserWindow) => {
    console.log(plugin, 45);
    let pluginIndexPath = plugin.tplPath || plugin.indexPath;
    if (!pluginIndexPath) {
      const pluginPath = path.resolve(baseDir, "node_modules", plugin.name);
      pluginIndexPath = `file://${path.join(pluginPath, "./", plugin.main)}`;
    }
    console.log(pluginIndexPath);
    const preload = getPreloadPath(plugin, pluginIndexPath);

    const ses = session.fromPartition("<" + plugin.name + ">");
    ses.setPreloads([`${__static}/preload.js`]);

    view = new BrowserView({
      webPreferences: {
        // enableRemoteModule: true,
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        webviewTag: true,
        preload,
        session: ses,
      },
    });
    window.setBrowserView(view);
    view.webContents.loadURL(pluginIndexPath);
    view.webContents.once("dom-ready", () => {
      window.setSize(800, 660);
      view.setBounds({ x: 0, y: 60, width: 800, height: 600 });
      view.setAutoResize({ width: true });
      executeHooks("PluginEnter", plugin.ext);
      executeHooks("PluginReady", plugin.ext);
      // window.webContents.executeJavaScript(`window.pluginLoaded()`);
    });
  };

  const removeView = (window: BrowserWindow) => {
    if (!view) return;
    window.removeBrowserView(view);
    window.setSize(800, 60);
    executeHooks("PluginOut", null);
    window.webContents.executeJavaScript(`window.initRubick()`);
    view = undefined;
  };

  const getView = () => view;

  const executeHooks = (hook, data) => {
    if (!view) return;
    const evalJs = `if(window.rubick && window.rubick.hooks && typeof window.rubick.hooks.on${hook} === 'function' ) {     
          try { 
            window.rubick.hooks.on${hook}(${data ? JSON.stringify(data) : ""});
          } catch(e) {} 
        }
      `;
    view.webContents.executeJavaScript(evalJs);
  };

  return {
    init,
    getView,
    removeView,
    executeHooks,
  };
};
