/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import type { searchItem } from "../../type/mtools/index";
import { ipcRenderer } from "electron";
import { Swiper, SwiperSlide } from "swiper/react";
import { MarketContext } from "../../component/mtools/marketContext";
import SwiperCore, { Mousewheel, Scrollbar, Keyboard } from "swiper";
import Market from "../../component/mtools/pluginCenter";
import "swiper/css";
import "swiper/css/scrollbar";
import styles from "../../styles/mtools/index.module.scss";

const marketName = "插件市场";

SwiperCore.use([Mousewheel, Scrollbar, Keyboard]);

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [arrData, setArrData] = useState<searchItem[]>([]);
  const [checkValue, setCheckValue] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [altKey, setAltKey] = useState(false);
  const scrollItem = useRef<any>(null);
  const swiperInstance = useRef<any>(null);
  const [scrollLock, setScrollLock] = useState(false);
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

  const coreSearchInput = useRef<any>(null);

  const coreSearchSpan = useRef<any>(null);

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
    if (checkValue === 0) {
      if (arrData.length - 1 > 10) {
        setCheckValue(9);
      } else {
        setCheckValue(arrData.length - 1);
      }
    } else {
      setCheckValue((item) => item - 1);
    }
  };

  const Down = () => {
    if (checkValue === arrData.length - 1) {
      setCheckValue(0);
      swiperInstance.current.slideTo(0, 0, false);
    } else {
      setCheckValue((item) => item + 1);
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

  const slideChange = (swiper) => {
    if (scrollLock) {
      setScrollLock(false);
      return;
    }
    if (checkValue < swiperInstance.current.activeIndex) {
      setCheckValue(swiper.activeIndex);
    }
    if (checkValue >= swiperInstance.current.activeIndex + 10) {
      setCheckValue(swiper.activeIndex + 9);
    }
  };

  const gerenateSearchItem = () => {
    // TODO 1-0 有问题
    // swiper 向上滚动不会rerender
    const activeIndex =
      (swiperInstance.current && swiperInstance?.current?.activeIndex) || 0;

    return arrData.map((item: any, index: number) => {
      return (
        <SwiperSlide key={item.id}>
          <div
            ref={checkValue === index ? scrollItem : null}
            className={`h-[60px] w-[100%] text-left flex px-4 cursor-pointer justify-between items-center  ${
              checkValue === index ? "bg-gray-300 checked" : ""
            }`}
            key={item.id}
            onClick={() => handleClick(item)}
          >
            <div className={`flex justify-left items-center w-[100%]`}>
              {!altKey ? (
                <img
                  className={`rounded-md mr-[6px]`}
                  src={item.icon || ""}
                  width={36}
                  height={36}
                  alt="icon"
                />
              ) : (
                <div
                  className={`rounded-md mr-[6px] w-[36px] h-[36px] leading-[36px] text-center`}
                >
                  {index - activeIndex + 1 >= 1 && index - activeIndex + 1 <= 10
                    ? index - activeIndex + 1
                    : ""}
                </div>
              )}
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
        </SwiperSlide>
      );
    });
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

  useEffect(() => {
    if (swiperInstance.current) {
      ipcRenderer.on("getSearchValue", (_event, arg) => {
        swiperInstance.current.slideTo(0, 0, false);
        setCheckValue(0);
        setArrData(arg || []);
      });
    }
  }, []);

  useEffect(() => {
    if (swiperInstance.current) {
      if (checkValue > swiperInstance.current.activeIndex + 9) {
        setScrollLock(true);
        swiperInstance.current.slideNext();
      }

      if (checkValue < swiperInstance.current.activeIndex) {
        setScrollLock(true);
        swiperInstance.current.slidePrev();
      }

      setCheckDataFn();
    }
  }, [checkValue]);

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
          className={`bg-gray-100 rounded-b-lg max-h-[600px] mt-[-5px] overflow-auto ${styles.scrollContent}`}
        >
          <Swiper
            className={`swiper-no-swiping`}
            onSlideChange={slideChange}
            scrollbar={{ draggable: false, dragSize: 50 }}
            speed={0}
            keyboard={{
              enabled: true,
              onlyInViewport: false,
            }}
            slidesPerView={10}
            onSwiper={(swiper) => {
              swiperInstance.current = swiper;
            }}
            direction={"vertical"}
            mousewheel={true}
          >
            {gerenateSearchItem()}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Home;
