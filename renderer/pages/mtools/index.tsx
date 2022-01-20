import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import styles from "../../styles/mtools/index.module.scss";
import Image from "next/image";
import type { searchItem } from "../../type/mtools/index";
import { ipcRenderer } from "electron";

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [arrData, setArrData] = useState<searchItem[]>([]);
  const [checkValue, setCheckValue] = useState(0);
  const scrollItem = useRef<any>(null);

  const handleSearch = ({ target }: any) => {
    setSearchValue(target.value);
    setCheckValue(0);
    if (!target.value) {
      setArrData([]);
      return;
    }
    ipcRenderer.send("handleSearchValue", target.value);
  };

  const keyDown = (e) => {
    const { keyCode } = e;
    switch (keyCode) {
      case 13:
        handleClick(arrData[checkValue]);
        break;
      case 32:
        handleClick(arrData[checkValue]);
        break;

      case 38:
        // Up
        e.preventDefault();
        if (checkValue === 0) {
          if (arrData.length - 1 > 10) {
            setCheckValue(9);
          } else {
            setCheckValue(arrData.length - 1);
          }
        } else {
          setCheckValue((item) => item - 1);
        }
        break;

      case 40:
        // Down
        e.preventDefault();
        if (checkValue === arrData.length - 1) {
          setCheckValue(0);
        } else {
          setCheckValue((item) => item + 1);
        }
        break;

      default:
        break;
    }
  };

  const handleClick = (item) => {
    ipcRenderer.send("handleOpenVlaue", item);
    setSearchValue("");
    setArrData([]);
  };

  const gerenateSearchItem = () =>
    arrData.map((item: any, index: number) => {
      return (
        <div
          ref={checkValue === index ? scrollItem : null}
          className={`h-[60px] flex px-4 justify-between items-center  ${
            checkValue === index ? "bg-gray-300 checked" : ""
          }`}
          key={item.id}
          onClick={() => handleClick(item)}
        >
          <div className={`flex justify-left items-center w-[100%]`}>
            <Image
              className={`rounded-md`}
              src={"files://" + item.icon || ""}
              width={50}
              height={50}
              alt="icon"
            />
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
    ipcRenderer.on("getSearchValue", (_event, arg) => {
      setArrData(arg || []);
    });
  }, []);

  useEffect(() => {
    scrollItem.current?.scrollIntoView({ behavior: "auto", block: "nearest" });
  }, [checkValue]);

  return (
    <div className={`p-4`}>
      <div
        className={`flex justify-center border-dark-100 border rounded-lg px-2`}
      >
        <input
          type="text"
          className={`block w-[100%] h-16 focus:outline-none px-2 text-2xl tracking-wider`}
          value={searchValue}
          spellCheck={false}
          onChange={handleSearch}
          onKeyDown={keyDown}
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
        className={`bg-gray-100 rounded-b-lg max-h-[600px] overflow-auto ${styles.bg}`}
      >
        {gerenateSearchItem()}
      </div>
    </div>
  );
};

export default Home;
