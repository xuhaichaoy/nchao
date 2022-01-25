declare global {
  namespace NodeJS {
    interface Global {
      windows: Electron.BrowserWindow;
      Bwindow: any;
      db: any;
    }
  }
}

export default global;
