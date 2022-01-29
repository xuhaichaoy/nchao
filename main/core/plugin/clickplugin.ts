import { app } from "electron";
import path from "path";
// import { toRaw } from "vue";
// import commonConst from "@/common/utils/commonConst";
import { dev } from "../../../utils/commonConst";
declare const __static: string;
const appPath = app.getPath("cache");
const baseDir = path.join(appPath, "./rubick-plugins");

export default function pluginClickEvent({ plugin, fe, cmd, ext, openPlugin }) {
  const pluginPath = path.resolve(baseDir, "node_modules", plugin.name);
  const pluginDist = {
    // ...toRaw(plugin),
    ...plugin,
    indexPath: `file://${path.join(pluginPath, "./", plugin.main || "")}`,
    cmd: cmd.label || cmd,
    feature: fe,
    ext,
  };
  // 模板文件
  if (!plugin.main) {
    pluginDist.tplPath = dev()
      ? "http://localhost:8082/#/"
      : `file://${__static}/tpl/index.html`;
  }
  // 插件市场
  if (plugin.name === "rubick-system-feature") {
    pluginDist.indexPath = dev()
      ? "http://localhost:8081/#/"
      : `file://${__static}/feature/index.html`;
  }
  openPlugin(pluginDist);
}
