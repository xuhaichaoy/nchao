import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import styles from "../../styles/mtools/index.module.scss";
// import { nativeImage } from "electron";
import Image from "next/image";
// import fileLists from "../../utils/win";
import type { searchItem } from "../../type/mtools/index";
import { useAsyncEffect } from "../../utils/index";
import { ipcRenderer } from "electron";

const Home: NextPage = () => {
  const [arrData, setArrData] = useState<searchItem[]>([]);
  const [local, setLocal] = useState([]);
  const [app, setApp] = useState({
    appList: [],
    plugins: [],
    localPlugins: [],
    currentPlugin: {},
    pluginLoading: false,
  });

  const appList = useRef<any>(null);

  const handleSearch = ({ target }: any) => {
    if (!target.value) {
      setArrData([]);
      return;
    }

    ipcRenderer.send("asynchronous-message", target.value);
  };

  const handleClick = (item) => {
    console.log(item);
  };

  const gerenateSearchItem = () =>
    arrData.map((item: any) => {
      return (
        <div
          className={`h-16 flex justify-between items-center`}
          key={item.id}
          onClick={() => handleClick(item)}
        >
          <div className={`flex justify-center items-center`}>
            {/* <Image
              className={`rounded-md`}
              src={"files://" + item.icon || ""}
              width={50}
              height={50}
              alt="icon"
            /> */}
            <div
              className={`mx-2 text-xl flex justify-center items-center flex-wrap`}
            >
              <span className={`flex-shrink-1 w-[100%]`}>{item.name}</span>
              <span
                className={`flex-shrink-1 w-[100%] text-xs mt-[2px] text-gray-600`}
              >
                {item.desc}
              </span>
            </div>
          </div>
          <div>{item.tips}</div>
        </div>
      );
    });

  useEffect(() => {
    ipcRenderer.on("asynchronous-reply", (event, arg) => {
      setArrData(arg || []);
    });
  }, []);

  return (
    <div className={`p-4`}>
      <div
        className={`flex justify-center border-dark-100 border rounded-lg px-2`}
      >
        <input
          type="text"
          className={`block w-[100%] h-16 focus:outline-none px-2 text-2xl tracking-wider`}
          spellCheck={false}
          onChange={handleSearch}
        />
        <div className={`flex items-center w-px-10px w-[50px]`}>
          <Image
            className={`rounded-md`}
            src="/user/avatar?uid=59155681&size=big"
            width={50}
            height={50}
            alt="icon"
          />
        </div>
      </div>

      <div
        className={`bg-gray-100 rounded-b-lg px-4 max-h-[600px] overflow-auto ${styles.bg}`}
      >
        {gerenateSearchItem()}
      </div>
    </div>
  );
};

export default Home;
