/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import type { searchItem } from "../../type/mtools/index";
import { ipcRenderer } from "electron";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Scrollbar, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import styles from "../../styles/mtools/index.module.scss";

SwiperCore.use([Mousewheel, Scrollbar, Keyboard]);

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [arrData, setArrData] = useState<searchItem[]>([]);
  const [checkValue, setCheckValue] = useState(0);
  const [altKey, setAltKey] = useState(false);
  const scrollItem = useRef<any>(null);
  const swiperInstance = useRef<any>(null);
  const [scrollLock, setScrollLock] = useState(false);

  const handleSearch = ({ target }: any) => {
    setSearchValue(target.value);
    setCheckValue(0);
    if (!target.value) {
      setArrData([]);
      return;
    }
    ipcRenderer.send("handleSearchValue", target.value);
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
      // alt 按下
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
    ipcRenderer.send("handleOpenVlaue", item);
    setSearchValue("");
    setArrData([]);
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

  const gerenateSearchItem = () =>
    arrData.map((item: any, index: number) => {
      return (
        <SwiperSlide key={item.id}>
          <div
            ref={checkValue === index ? scrollItem : null}
            className={`h-[60px] w-[100%] text-left flex px-4 justify-between items-center  ${
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
                  {index + 1}
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

  useEffect(() => {
    ipcRenderer.on("getSearchValue", (_event, arg) => {
      setArrData([...arg] || []);
    });
  }, []);

  useEffect(() => {
    if (checkValue > swiperInstance.current.activeIndex + 9) {
      setScrollLock(true);
      swiperInstance.current.slideNext();
    }

    if (checkValue < swiperInstance.current.activeIndex) {
      setScrollLock(true);
      swiperInstance.current.slidePrev();
    }
  }, [checkValue]);

  return (
    <div className={``}>
      <div
        className={`flex justify-center border-dark-100 border rounded-lg px-2`}
      >
        <input
          type="text"
          className={`block w-[100%] h-16 focus:outline-none px-2 text-2xl tracking-wider ${styles.coreSearch}`}
          value={searchValue}
          spellCheck={false}
          onChange={handleSearch}
          onKeyDown={keyDown}
          onKeyUp={keyUp}
        />
        <div className={`flex items-center w-px-10px w-[50px]`}>
          <Image
            className={`rounded-md`}
            src="/user/avatar?uid=59155681&size=big"
            width={50}
            height={50}
            alt="icon"
          />
          {/* <img src="" alt="" /> */}
        </div>
      </div>

      <div
        className={`bg-gray-100 rounded-b-lg max-h-[600px] overflow-auto ${styles.scrollContent}`}
      >
        <Swiper
          className={`swiper-no-swiping`}
          onSlideChange={slideChange}
          scrollbar={{ draggable: false }}
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
    </div>
  );
};

export default Home;
