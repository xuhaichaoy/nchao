/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import MarketIndexExplore from "./marketIndexExplore";
import { Input, Menu } from "antd";
import styles from "../../styles/mtools/index.module.scss";
const { Search } = Input;

const MarketIndex: NextPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onSearch = (value) => console.log(value);

  return (
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
        className={`ml-[10px] w-[calc(100%-210px)] h-[calc(100vh-126px)] pr-[20px] box-border overflow-auto ${styles.scrollStyle}`}
      >
        <MarketIndexExplore />
      </div>
    </div>
  );
};

export default MarketIndex;
