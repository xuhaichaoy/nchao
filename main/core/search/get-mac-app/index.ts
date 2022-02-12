/* eslint-disable import/no-anonymous-default-export */
import getApps from "./getApps";

export default {
  getApps: () => {
    return new Promise((resolve, reject) => getApps(resolve, reject));
  },
  isInstalled: (appName: boolean) => {
    return new Promise((resolve, reject) => getApps(resolve, reject, appName));
  },
};