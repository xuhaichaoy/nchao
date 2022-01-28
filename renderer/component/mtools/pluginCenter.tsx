/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState, useRef, useContext } from "react";
import { UnorderedListOutlined, AndroidOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import MarkIndex from "./marketIndex";
import { MarketContext } from "./marketContext";
const { TabPane } = Tabs;

const MarketCenter: NextPage = () => {
  const Origin = useContext<any>(MarketContext);
  const { resetFn } = Origin;
  const handleKeyPress = (e) => {
    const { keyCode } = e;
    console.log(keyCode);
    switch (keyCode) {
      case 27:
        resetFn();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
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
            <MarkIndex />
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
  );
};

export default MarketCenter;
