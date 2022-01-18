import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import styles from "../../styles/mtools/index.module.scss";
// import { nativeImage } from "electron";
import Image from "next/image";
import fileLists from "../../utils/win";
import type { searchItem } from "../../type/mtools/index";
import { useAsyncEffect } from "../../utils/index";

// const arr: searchItem[] = [
//   {
//     id: 1,
//     tips: "12312312313",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "12312312311111111111",
//     path: "asdasdas/asdasd/asdasd",
//   },
//   {
//     id: 2,
//     tips: "1111111111111",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "123123123a",
//     path: "asdasdas/asdasd/asdasd",
//   },
//   {
//     id: 3,
//     tips: "3333333333",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "123123123d",
//     path: "asdasdas/asdasd/asdasd",
//   },
//   {
//     id: 4,
//     tips: "3333333333",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "123123123d",
//     path: "asdasdas/asdasd/asdasd",
//   },
//   {
//     id: 5,
//     tips: "3333333333",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "123123123d",
//     path: "asdasdas/asdasd/asdasd",
//   },
//   {
//     id: 6,
//     tips: "3333333333",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "123123123d",
//     path: "asdasdas/asdasd/asdasd",
//   },
//   {
//     id: 7,
//     tips: "3333333333",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "123123123d",
//     path: "asdasdas/asdasd/asdasd",
//   },
//   {
//     id: 8,
//     tips: "3333333333",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "123123123d",
//     path: "asdasdas/asdasd/asdasd",
//   },
//   {
//     id: 9,
//     tips: "3333333333",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "123123123d",
//     path: "asdasdas/asdasd/asdasd",
//   },
//   {
//     id: 10,
//     tips: "3333333333",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "123123123d",
//     path: "asdasdas/asdasd/asdasd",
//   },
//   {
//     id: 11,
//     tips: "3333333333",
//     imgIcon: "/user/avatar?uid=59155681&size=big",
//     name: "123123123d",
//     path: "asdasdas/asdasd/asdasd",
//   },
// ];

const Home: NextPage = () => {
  const [arrData, setArrData] = useState<searchItem[]>([]);
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
    const res = appList.current.filter((item) => {
      if (item && item?.name?.includes(target.value)) {
        return item;
      }
      return "";
    });
    console.log(res);

    setArrData(res);
  };

  const gerenateSearchItem = () =>
    arrData.map((item: any) => {
      return (
        <div
          className={`h-16 flex justify-between items-center`}
          key={item.desc}
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

  const changeCorptype = (arr, corptype) => {
    const res = new Map();
    arr.filter(
      (x) =>
        x.CORPTYPE == corptype &&
        !res.has(x.SCOMPANYNAME) &&
        res.set(x.SCOMPANYNAME, 1)
    );
    return arr;
  };

  useEffect(() => {
    // console.log(fileLists());
    // console.log(123123123);
  }, []);

  useAsyncEffect(async () => {
    const data = await fileLists();
    const a = changeCorptype(data, "desc");
    console.log(a);
    appList.current = data;
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
