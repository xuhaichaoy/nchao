import { task, logger } from "just-scripts";
import download from "download";
import path from "path";

task("install", () => {
  return new Promise<void>((resolve, reject) => {
    const localPath = path.join(__dirname, "lib");
    var platform = process.env.npm_config_target_platform || process.platform;
    logger.info(`[install] Target platform: ${platform}`);
    if (platform === "darwin") {
      platform = "osx";
    } else if (platform === "win32") {
      platform = "windows";
    }
    var arch = process.env.npm_config_target_arch || process.arch;
    logger.info(`[install] Target arch: ${arch}`);
    const downloadUrl = `https://github.com/wangfenjin/simple/releases/download/v0.0.5-alpha2/libsimple-${platform}-${arch}.zip`;
    logger.info(`[install] Download prebuilt binaries from ${downloadUrl}`);
    download(downloadUrl, localPath, {
      extract: true,
      strip: 1,
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        logger.warn(
          `[install] Failed to download package from: ${downloadUrl}, err: ${err}`
        );
        reject();
      });
  });
});
