/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import type { searchItem } from "../../type/mtools/index";
import { ipcRenderer } from "electron";
import { MarketContext } from "../../component/mtools/marketContext";
import Market from "../../component/mtools/pluginCenter";
import styles from "../../styles/mtools/index.module.scss";

const marketName = "插件市场";

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [arrData, setArrData] = useState<searchItem[]>([]);
  const [checkValue, setCheckValue] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [altKey, setAltKey] = useState(false);
  const scrollItem = useRef<any>(null);
  const [checkData, setCheckData] = useState<searchItem>({
    id: 0,
    tips: "",
    icon: "",
    name: "",
    path: "",
    action: "",
    desc: "",
    info: "",
    keyWords: "",
    names: "",
    pluginType: "home",
    type: "home",
    value: "",
  });

  const [initPosition, setInitPosition] = useState(0);

  const [firstCurrent, setFirstCurrent] = useState(0);

  const coreSearchInput = useRef<any>(null);

  const coreSearchSpan = useRef<any>(null);

  const wheelScrollContent = useRef<any>(null);

  const [isMarket, setIsMarket] = useState(false);

  const handleSearch = ({ target }: any) => {
    if (isMarket && target.value.length < marketName.length) {
      resetFn();
      return;
    }

    if (isMarket && target.value.length > marketName.length) {
      return;
    }

    setSearchValue(target.value.trim());

    if (!target.value) {
      setArrData([]);
      return;
    }
    ipcRenderer.send("handleSearchValue", target.value);
  };

  const resetFn = () => {
    if (!searchValue) {
      // 关闭窗口
      ipcRenderer.send("close");
      return;
    }
    setIsMarket(false);
    setSearchValue("");
    setArrData([]);
    setItemHeight(66);
    ipcRenderer.send("setWindowSize", 66);
    coreSearchInput.current?.focus();
  };

  const Up = () => {
    keyScrollFn(1);
  };

  const Down = () => {
    keyScrollFn(-1);
  };

  const keyScrollFn = (direction) => {
    let lastCheck =
      firstCurrent + 10 > arrData.length ? arrData.length : firstCurrent + 10;

    let firstCheck = firstCurrent;

    let res = 0;

    let currentCheck = checkValue;

    if (direction > 0) {
      currentCheck -= 1;
    } else {
      currentCheck += 1;
    }

    if (currentCheck + 1 > lastCheck) {
      if (currentCheck === arrData.length) {
        currentCheck = 0;
        res = 0;
        firstCheck = 0;
      } else {
        firstCheck += 1;
        lastCheck =
          lastCheck + 1 > arrData.length ? arrData.length : lastCheck + 1;
        res = initPosition - 60;
      }
      setInitPosition(res);
      wheelScrollContent.current.style.transform = `translate(0px, ${res}px)`;
    }

    if (currentCheck < firstCheck) {
      if (currentCheck < 0) {
        setCheckValue(lastCheck - 1);
        return;
      } else {
        firstCheck -= 1;
        lastCheck -= 1;
        res = initPosition + 60;
        setInitPosition(res);
        wheelScrollContent.current.style.transform = `translate(0px, ${res}px)`;
      }
    }
    setFirstCurrent(firstCheck);
    setCheckValue(currentCheck);
  };

  const keyOpenApp = (num = 0) => {
    let check = (!num ? 10 : num) + firstCurrent;

    if (arrData.length >= check) {
      handleClick(arrData[check - 1]);
    }
  };

  const keyDown = (e) => {
    const { keyCode, altKey } = e;

    if (altKey) {
      e.preventDefault();
      setAltKey(true);
    } else {
      setAltKey(false);
    }

    if ((altKey && keyCode >= 48) || (altKey && keyCode <= 57)) {
      // 快捷打开
      keyOpenApp(keyCode - 48);
      return;
    }
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
        Up();
        break;

      case 40:
        // Down
        e.preventDefault();
        Down();
        break;

      case 27:
        // reset
        resetFn();

      default:
        break;
    }
  };

  const keyUp = (e) => {
    const { keyCode, altKey } = e;

    switch (keyCode) {
      case 18:
        setAltKey(false);
        break;

      default:
        break;
    }
  };

  const handleClick = (item) => {
    if (!item) {
      return;
    }
    setSearchValue("");
    setArrData([]);

    if (item.pluginType === "app") {
      // 打开app
      setTimeout(() => {
        console.log(item);
        ipcRenderer.send("handleOpenVlaue", item);
        ipcRenderer.send("close");
      }, 0);
    } else if (item.pluginType === "ui") {
      // 打开UI
      // if (state.currentPlugin && state.currentPlugin.name === plugin.name) {
      //   return;
      // }
      // state.pluginLoading = true;
      // state.currentPlugin = plugin;
      ipcRenderer.send("openPlugin", {
        type: "openPlugin",
        plugin: JSON.parse(
          JSON.stringify({
            ...item,
            // ext: item.ext || {
            //   code: item.feature.code,
            //   type: item.cmd.type || "text",
            //   payload: null,
            // },
          })
        ),
      });
    } else if (item.pluginType === "system") {
      // 打开system
    }
  };

  const setCheckDataFn = () => {
    if (arrData[checkValue]) {
      setCheckData(arrData[checkValue]);
    } else {
      setCheckData({
        id: 0,
        tips: "",
        icon: "",
        name: "",
        path: "",
        action: "",
        desc: "",
        info: "",
        keyWords: "",
        names: "",
        pluginType: "home",
        type: "home",
        value: "",
      });
    }
  };

  const openPluginCenter = () => {
    if (checkData.type === "home") {
      // 打开插件中心
      setSearchValue(marketName);
      setIsMarket(true);
      setItemHeight(660);
      ipcRenderer.send("setWindowSize", 660);
    }
  };

  const searchIcon = () => {
    if (checkData.type === "home") {
      return "https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg";
    }
    if (checkData.type === "app") {
      return "https://wcdn1.cgyouxi.com/avatar/33807727_1642772971_middle.jpg";
    } else {
      return checkData.icon || "";
    }
  };

  const focusInput = () => {
    coreSearchInput.current?.focus();
  };

  const context = {
    resetFn,
  };

  const windowMove = (canMove: boolean) => {
    ipcRenderer.send("window-move-open", {
      canMove,
      itemHeight,
    });
  };

  const onMouseDown = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSpanElement
    ) {
      windowMove(false);
      return;
    }

    windowMove(true);
  };

  const wheelScroll = ({ deltaY }) => {
    // const maxScrollHeight =
    //   arrData.length - 10 > 0 ? (arrData.length - 10) * 60 : 0;

    // let res = 0;

    // let lastCheck =
    //   firstCurrent + 10 > arrData.length ? arrData.length : firstCurrent + 10;

    // let firstCheck = firstCurrent;

    // if (deltaY > 0) {
    //   if (initPosition === -maxScrollHeight) {
    //     return;
    //   }
    //   res = initPosition - 60;
    //   firstCheck += 1;
    //   lastCheck =
    //     lastCheck + 1 > arrData.length ? arrData.length : lastCheck + 1;
    // } else {
    //   if (initPosition === 0) {
    //     return;
    //   }
    //   res = initPosition + 60;
    //   firstCheck -= 1;
    //   lastCheck = lastCheck - 1;
    // }
    // setFirstCurrent(firstCheck);

    // if (checkValue < firstCheck) {
    //   setCheckValue(checkValue + 1);
    // }

    // if (checkValue >= lastCheck) {
    //   setCheckValue(checkValue - 1);
    // }

    // setInitPosition(res);

    // wheelScrollContent.current.style.transform = `translate(0px, ${res}px)`;

    whellScrollFn(deltaY);
  };

  const whellScrollFn = (direction) => {
    const maxScrollHeight =
      arrData.length - 10 > 0 ? (arrData.length - 10) * 60 : 0;

    let res = 0;

    let lastCheck =
      firstCurrent + 10 > arrData.length ? arrData.length : firstCurrent + 10;

    let firstCheck = firstCurrent;

    if (direction > 0) {
      if (initPosition === -maxScrollHeight) {
        return;
      }
      res = initPosition - 60;
      firstCheck += 1;
      lastCheck =
        lastCheck + 1 > arrData.length ? arrData.length : lastCheck + 1;
    } else {
      if (initPosition === 0) {
        return;
      }
      res = initPosition + 60;
      firstCheck -= 1;
      lastCheck = lastCheck - 1;
    }
    setFirstCurrent(firstCheck);

    if (checkValue < firstCheck) {
      setCheckValue(checkValue + 1);
    }

    if (checkValue >= lastCheck) {
      setCheckValue(checkValue - 1);
    }

    setInitPosition(res);

    wheelScrollContent.current.style.transform = `translate(0px, ${res}px)`;
  };

  const getBracketStr = (text) => {
    let regex = /\[(.+?)\]/g;
    let options = text.match(regex);

    options?.map((item) => {
      text = text.replace(item, `<i>${item.substring(1, item.length - 1)}</i>`);
    });

    return text;
  };

  const handleLighting = ({ info, name }) => {
    if (!info) {
      return name;
    }
    let words = info?.split(",")[0];
    const res = getBracketStr(words);
    return res;
  };

  const gerenateSearchItem = () => {
    return arrData.map((item: any, index: number) => {
      return (
        <div
          ref={checkValue === index ? scrollItem : null}
          className={`h-[60px] w-[100%] text-left flex px-4 cursor-pointer justify-between items-center  ${
            checkValue === index ? "bg-gray-300 checked" : ""
          }`}
          key={item.id}
          onClick={() => handleClick(item)}
        >
          <div className={`flex justify-left items-center w-[100%] relative`}>
            <img
              className={`rounded-md mr-[6px]`}
              src={item.icon || ""}
              width={36}
              height={36}
              alt="icon"
            />

            {altKey ? (
              <div
                className={`rounded-md mr-[6px] w-[36px] h-[36px] leading-[36px] text-center flex-shrink-0 absolute bg-opacity-80 bg-light-900`}
              >
                {index - firstCurrent + 1 >= 1 && index - firstCurrent + 1 <= 10
                  ? index - firstCurrent + 1 === 10
                    ? 0
                    : index - firstCurrent + 1
                  : ""}
              </div>
            ) : (
              ""
            )}

            <div
              className={`mx-2 text-xl flex justify-center items-center flex-wrap`}
            >
              <span
                className={`flex-shrink-1 w-[100%] ${styles.searchItemName}`}
                dangerouslySetInnerHTML={{ __html: handleLighting(item) }}
              ></span>
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
  };

  useEffect(() => {
    ipcRenderer.on("getSearchValue", (_event, arg) => {
      setInitPosition(0);
      wheelScrollContent.current.style.transform = `translate(0px, ${0}px)`;
      setFirstCurrent(0);
      setCheckValue(0);
      setArrData(arg || []);
    });
  }, []);

  useEffect(() => {
    let currentHeight = 0;
    if (arrData.length >= 10) {
      currentHeight = 660;
    } else if (arrData.length > 0) {
      currentHeight = arrData.length * 60 + 62;
    } else {
      currentHeight = 66;
    }
    setItemHeight(currentHeight);
    ipcRenderer.send("setWindowSize", currentHeight);

    setCheckDataFn();
    console.log(arrData);
  }, [arrData.length]);

  useEffect(() => {
    coreSearchInput.current.style.width = `${
      coreSearchSpan.current.clientWidth + 4
    }px`;
  }, [searchValue]);

  useEffect(() => {
    ipcRenderer.on("onfocus", (_event, arg) => {
      if (arg) {
        coreSearchInput.current?.focus();
      }
    });
  }, []);

  return (
    <div className={`min-h-[66px]`}>
      <div
        className={`flex justify-between border-dark-100 border rounded-lg bg-light-50 px-2 ${
          styles.coreSearch
        } ${isMarket ? styles.canDrag : ""}`}
        onClick={focusInput}
      >
        <div
          className={`w-[calc(100%-60px)] h-16 cursor-default flex justify-start items-center overflow-x-auto pr-[10px] box-border relative`}
          onClick={focusInput}
          onContextMenu={focusInput}
          onMouseDown={onMouseDown}
          onMouseUp={() => windowMove(false)}
        >
          {searchValue.length > 0 ? (
            ""
          ) : (
            <div
              className={`w-[100%] px-2 text-2xl tracking-wider absolute z-[-1] text-gray-500`}
            >
              Hi, mTools
            </div>
          )}

          <span
            ref={coreSearchSpan}
            className={`max-w-[100%] invisible absolute z-[-1px] overflow-x-auto flex justify-start items-center h-[40px] focus:outline-none px-2 text-2xl tracking-wider cursor-auto leading-[40px] pr-[6px] ${styles.searchStyle}`}
            spellCheck={false}
          >
            {searchValue}
          </span>

          <input
            ref={coreSearchInput}
            type="text"
            placeholder="Hi, mTools"
            className={`max-w-[100%] block h-16 focus:outline-none px-2 text-2xl tracking-wider`}
            value={searchValue}
            spellCheck={false}
            onChange={handleSearch}
            onKeyDown={keyDown}
            onKeyUp={keyUp}
          />
        </div>
        <div className={`flex items-center w-px-10px w-[50px]`}>
          <img
            className={`rounded-md ${
              checkData.type === "home" && "cursor-pointer"
            }`}
            src={searchIcon()}
            onClick={openPluginCenter}
            onContextMenu={openPluginCenter}
            width={50}
            height={50}
            alt="icon"
          />
        </div>
      </div>

      {isMarket ? (
        <MarketContext.Provider value={context}>
          <Market />
        </MarketContext.Provider>
      ) : (
        <div
          className={`bg-gray-100 rounded-b-lg max-h-[600px] mt-[-5px] overflow-hidden relative z-1 ${styles.scrollContent}`}
        >
          <div
            onWheel={wheelScroll}
            ref={wheelScrollContent}
            className={`transform-gpu`}
          >
            {gerenateSearchItem()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
