/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
import type { searchItem } from "../../type/mtools/index";
import { ipcRenderer } from "electron";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Scrollbar, Keyboard } from "swiper";
import {
  UnorderedListOutlined,
  AndroidOutlined,
  AudioOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Tabs, Input, Space, Menu, Button } from "antd";
import "swiper/css";
import "swiper/css/scrollbar";
import styles from "../../styles/mtools/index.module.scss";
const { TabPane } = Tabs;
const { Search } = Input;
const { SubMenu } = Menu;

SwiperCore.use([Mousewheel, Scrollbar, Keyboard]);

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [arrData, setArrData] = useState<searchItem[]>([]);
  const [checkValue, setCheckValue] = useState(0);
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

  const [collapsed, setCollapsed] = useState(false);

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const handleSearch = ({ target }: any) => {
    setSearchValue(target.value);
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
    setSearchValue("");
    setArrData([]);
    setTimeout(() => {
      ipcRenderer.send("handleOpenVlaue", item);
    }, 0);
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

    console.log(checkData);
  };

  const handleClickPlugin = () => {
    if (checkData.type === "home") {
      // TODO
      // 打开插件中心
      console.log(11111111);
      ipcRenderer.send("setWindowSize", 660);
    }
  };

  const searchIcon = () => {
    console.log(checkData.type);
    if (checkData.type === "home") {
      return "https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg";
    }
    if (checkData.type === "app") {
      return "https://wcdn1.cgyouxi.com/avatar/33807727_1642772971_middle.jpg";
    } else {
      return checkData.icon || "";
    }
  };

  const callback = (key) => {
    console.log(key);
  };

  useEffect(() => {
    ipcRenderer.on("getSearchValue", (_event, arg) => {
      swiperInstance.current.slideTo(0, 0, false);
      setCheckValue(0);
      setArrData(arg || []);
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

    setCheckDataFn();
  }, [checkValue]);

  useEffect(() => {
    if (arrData.length >= 10) {
      ipcRenderer.send("setWindowSize", 660);
    } else if (arrData.length > 0) {
      ipcRenderer.send("setWindowSize", arrData.length * 60 + 62);
    } else {
      ipcRenderer.send("setWindowSize", 660);
    }

    setCheckDataFn();
  }, [arrData.length]);

  const onSearch = (value) => console.log(value);

  return (
    <div className={``}>
      <div
        className={`flex justify-center border-dark-100 border rounded-lg px-2 ${styles.coreSearch}`}
      >
        <input
          type="text"
          className={`block w-[100%] h-16 focus:outline-none px-2 text-2xl tracking-wider`}
          value={searchValue}
          spellCheck={false}
          onChange={handleSearch}
          onKeyDown={keyDown}
          onKeyUp={keyUp}
        />
        <div className={`flex items-center w-px-10px w-[50px]`}>
          <img
            className={`rounded-md ${
              checkData.type === "home" && "cursor-pointer"
            }`}
            src={searchIcon()}
            onClick={handleClickPlugin}
            width={50}
            height={50}
            alt="icon"
          />
        </div>
      </div>

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

      <div className={`mt-[-5px] bg-light-50`}>
        <div className={``}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span className={`pl-[14px] pr-[14px]`}>
                  <UnorderedListOutlined />
                  插件市场
                </span>
              }
              key="1"
            >
              <div className={`flex justify-start items-start box-border`}>
                <div className={`w-[200px]`}>
                  <Search
                    className={`rounded pl-[10px]`}
                    placeholder="search text"
                    allowClear
                    onSearch={onSearch}
                    style={{ width: 197 }}
                  />
                  <Menu
                    className={`mt-[10px]`}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                  >
                    <Menu.Item
                      className={`!pl-[14px]`}
                      key="1"
                      icon={<PieChartOutlined />}
                    >
                      探索
                    </Menu.Item>
                    <Menu.Item
                      className={`!pl-[14px]`}
                      key="2"
                      icon={<DesktopOutlined />}
                    >
                      生产效率
                    </Menu.Item>
                    <Menu.Item
                      className={`!pl-[14px]`}
                      key="3"
                      icon={<ContainerOutlined />}
                    >
                      搜索工具
                    </Menu.Item>
                    <Menu.Item
                      className={`!pl-[14px]`}
                      key="4"
                      icon={<ContainerOutlined />}
                    >
                      图像
                    </Menu.Item>
                    <Menu.Item
                      className={`!pl-[14px]`}
                      key="5"
                      icon={<ContainerOutlined />}
                    >
                      开发
                    </Menu.Item>
                    <Menu.Item
                      className={`!pl-[14px]`}
                      key="6"
                      icon={<ContainerOutlined />}
                    >
                      创意
                    </Menu.Item>
                  </Menu>
                </div>
                <div
                  className={`ml-[10px] w-[calc(100%-210px)] pr-[20px] box-border`}
                >
                  <div className={`flex justify-start items-center`}>
                    <img
                      className={`w-[calc(50%-5px)] h-[160px] cursor-pointer rounded`}
                      src="https://pic.cgyouxi.com/orange/upload/202107/79031603_d73aab3135e1085ecc84aec671f682f9.gif"
                      alt=""
                    />
                    <img
                      className={`w-[calc(50%-5px)] h-[160px] cursor-pointer rounded ml-[10px]`}
                      src="https://pic.cgyouxi.com/orange/title/faa92632e8f6c4d72ccfb56a1d2d5f79_48.jpg"
                      alt=""
                    />
                  </div>
                  <div className={`mt-[24px]`}>
                    <div className={`flex justify-between items-center`}>
                      <div>推荐</div>
                      <div>查看全部</div>
                    </div>
                    <div
                      className={`flex justify-start items-start flex-wrap mt-[6px]`}
                    >
                      <div
                        className={`w-[calc(50%-10px)] h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
                      >
                        <div className={`flex justify-start items-start`}>
                          <img
                            className={`w-[40px] rounded`}
                            src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                            alt=""
                          />
                          <div className={`ml-[10px]`}>
                            <div>namesss</div>
                            <span>tipsssss</span>
                          </div>
                        </div>
                        <div>icon</div>
                      </div>
                      <div
                        className={`w-[calc(50%-10px)] h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
                      >
                        <div className={`flex justify-start items-start`}>
                          <img
                            className={`w-[40px] rounded`}
                            src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                            alt=""
                          />
                          <div className={`ml-[10px]`}>
                            <div>namesss</div>
                            <span>tipsssss</span>
                          </div>
                        </div>
                        <div>icon</div>
                      </div>
                      <div
                        className={`w-[calc(50%-10px)] h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
                      >
                        <div className={`flex justify-start items-start`}>
                          <img
                            className={`w-[40px] rounded`}
                            src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                            alt=""
                          />
                          <div className={`ml-[10px]`}>
                            <div>namesss</div>
                            <span>tipsssss</span>
                          </div>
                        </div>
                        <div>icon</div>
                      </div>
                      <div
                        className={`w-[calc(50%-10px)] h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
                      >
                        <div className={`flex justify-start items-start`}>
                          <img
                            className={`w-[40px] rounded`}
                            src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                            alt=""
                          />
                          <div className={`ml-[10px]`}>
                            <div>namesss</div>
                            <span>tipsssss</span>
                          </div>
                        </div>
                        <div>icon</div>
                      </div>
                      <div
                        className={`w-[calc(50%-10px)] h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
                      >
                        <div className={`flex justify-start items-start`}>
                          <img
                            className={`w-[40px] rounded`}
                            src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                            alt=""
                          />
                          <div className={`ml-[10px]`}>
                            <div>namesss</div>
                            <span>tipsssss</span>
                          </div>
                        </div>
                        <div>icon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span className={`pl-[14px] pr-[14px]`}>
                  <AndroidOutlined />
                  我的插件
                </span>
              }
              key="2"
            >
              Tab 2
            </TabPane>
            <TabPane
              tab={
                <span className={`pl-[14px] pr-[14px]`}>
                  <AndroidOutlined />
                  偏好设置
                </span>
              }
              key="3"
            >
              Tab 3
            </TabPane>
            <TabPane
              tab={
                <span className={`pl-[14px] pr-[14px]`}>
                  <AndroidOutlined />
                  帐号与数据
                </span>
              }
              key="4"
            >
              Tab 4
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;
