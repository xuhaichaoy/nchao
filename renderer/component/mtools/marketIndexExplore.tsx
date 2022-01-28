/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import { CloudDownloadOutlined } from "@ant-design/icons";
import styles from "../../styles/mtools/index.module.scss";

const MarketIndexExplore: NextPage = () => {
  return (
    <>
      <div className={`flex justify-start items-center mb-[20px]`}>
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
      <div className={``}>
        <div className={`flex justify-between items-center`}>
          <div className={`text-[16px] font-semibold`}>推荐</div>
          <div className={`text-[13px] text-sky-500 cursor-pointer`}>
            查看全部
          </div>
        </div>
        <div className={`flex justify-start items-start flex-wrap mt-[14px]`}>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div
              className={`flex justify-start items-center w-[calc(100%-18px)]`}
            >
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px] w-[calc(100%-54px)]`}>
                <div
                  className={`text-[14px] overflow-hidden overflow-ellipsis whitespace-nowrap`}
                >
                  阿萨大时代
                </div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block overflow-hidden overflow-ellipsis whitespace-nowrap`}
                >
                  啊啊啊啊啊啊aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
        </div>
      </div>
      <div className={`h-[1px] w-[100%] bg-gray-200 mt-[20px] mb-[30px]`}></div>
      <div className={``}>
        <div className={`flex justify-between items-center`}>
          <div className={`text-[16px] font-semibold`}>推荐</div>
          <div className={`text-[13px] text-sky-500 cursor-pointer`}>
            查看全部
          </div>
        </div>
        <div className={`flex justify-start items-start flex-wrap mt-[14px]`}>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
        </div>
      </div>
      <div className={`h-[1px] w-[100%] bg-gray-200 mt-[20px] mb-[30px]`}></div>
      <div className={``}>
        <div className={`flex justify-between items-center`}>
          <div className={`text-[16px] font-semibold`}>推荐</div>
          <div className={`text-[13px] text-sky-500 cursor-pointer`}>
            查看全部
          </div>
        </div>
        <div className={`flex justify-start items-start flex-wrap mt-[14px]`}>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
          <div
            className={`w-[calc(50%-10px)] cursor-pointer h-[50px] ${styles.marketContentItem} flex justify-between items-center`}
          >
            <div className={`flex justify-start items-center`}>
              <img
                className={`w-[40px] rounded`}
                src="https://wcdn1.cgyouxi.com/avatar/59155681_1617962918_big.jpg"
                alt=""
              />
              <div className={`ml-[10px]`}>
                <div className={`text-[14px]`}>阿萨大时代</div>
                <span
                  className={`text-[12px] mt-[8px] text-warm-gray-400 block`}
                >
                  啊啊啊啊啊啊
                </span>
              </div>
            </div>
            <div>
              <CloudDownloadOutlined className={`text-[18px]`} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketIndexExplore;
