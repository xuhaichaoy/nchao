declare global {
  namespace NodeJS {
    interface Global {
      windows: Electron.BrowserWindow;
      OpenFilter: defaultType;
      Bwindow: any;
      db: any;
    }
  }
}

interface defaultType {
  openfilter: any;
}

export default global;
