import sqlite from "sqlite3";
import path from "path";

import process from "process";
const sqlite3 = sqlite.verbose();

const createTable = () => {
  db.serialize(function () {
    var ext_path: any = path.resolve("./lib/");
    if (argv("ext_path")) {
      ext_path = argv("ext_path");
    }
    var dict_path: any = path.join(ext_path, "dict");
    if (argv("dict_path")) {
      dict_path = argv("dict_path");
    }
    console.log("extension path: " + ext_path + ", dict path: " + dict_path);
    var platform = process.env.npm_config_target_platform || process.platform;
    if (platform === "win32") {
      console.log(ext_path);
      db.loadExtension(path.join(ext_path, "simple"));
    } else {
      db.loadExtension(path.join(ext_path, "libsimple"));
    }
    db.run("select jieba_dict(?)", dict_path);

    db.run(
      "CREATE VIRTUAL TABLE IF NOT EXISTS local USING fts5(desc, icon, value, type, pluginType, action, keyWords, name, names,tokenize = 'simple')"
    );
  });
};

export const insertTable = (data) => {
  var stmt = db.prepare(
    "INSERT INTO local(desc, icon, value, type, pluginType, action, keyWords, name, names) values ($desc, $icon, $value, $type, $pluginType, $action, $keyWords, $name, $names)"
  );
  data.map((item) => {
    stmt.run(
      item.desc,
      item.icon,
      item.value,
      item.type,
      item.pluginType,
      item.action,
      item.keyWords,
      item.name,
      item.names
    );
    return item;
  });
};

export const delTable = () => {
  // db.run("select fts5(?1)");
  db.run("DELETE FROM local");
};

export const readAllRows = (query, params = []) => {
  return new Promise(function (resolve, reject) {
    db.all(query, (params = []), function (err, row) {
      resolve(row);
    });
  });
};

export const db = new sqlite3.Database(":memory:", createTable);

const argv = (key) => {
  // Return true if the key exists and a value is defined
  if (process.argv.includes(`--${key}`)) return true;
  const value = process.argv.find((element) => element.startsWith(`--${key}=`));
  // Return null if the key does not exist and a value is not defined
  if (!value) return null;
  return value.replace(`--${key}=`, "");
};
