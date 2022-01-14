import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../../styles/mtools/index.module.scss";
import Image from "next/image";
import type { searchItem } from "../../type/mtools/index";

const arr: searchItem[] = [
  {
    id: 1,
    tips: "12312312313",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "12312312311111111111",
    path: "asdasdas/asdasd/asdasd",
  },
  {
    id: 2,
    tips: "1111111111111",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "123123123a",
    path: "asdasdas/asdasd/asdasd",
  },
  {
    id: 3,
    tips: "3333333333",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "123123123d",
    path: "asdasdas/asdasd/asdasd",
  },
  {
    id: 4,
    tips: "3333333333",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "123123123d",
    path: "asdasdas/asdasd/asdasd",
  },
  {
    id: 5,
    tips: "3333333333",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "123123123d",
    path: "asdasdas/asdasd/asdasd",
  },
  {
    id: 6,
    tips: "3333333333",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "123123123d",
    path: "asdasdas/asdasd/asdasd",
  },
  {
    id: 7,
    tips: "3333333333",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "123123123d",
    path: "asdasdas/asdasd/asdasd",
  },
  {
    id: 8,
    tips: "3333333333",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "123123123d",
    path: "asdasdas/asdasd/asdasd",
  },
  {
    id: 9,
    tips: "3333333333",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "123123123d",
    path: "asdasdas/asdasd/asdasd",
  },
  {
    id: 10,
    tips: "3333333333",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "123123123d",
    path: "asdasdas/asdasd/asdasd",
  },
  {
    id: 11,
    tips: "3333333333",
    imgIcon: "/user/avatar?uid=59155681&size=big",
    name: "123123123d",
    path: "asdasdas/asdasd/asdasd",
  },
];

const Home: NextPage = () => {
  const [arrData, setArrData] = useState<searchItem[]>(arr);
  const handleSearch = ({ target }: any) => {
    const res = arr.filter((item) => {
      if (item && item?.name?.includes(target.value)) {
        return item;
      }
      return "";
    });

    setArrData(res);
  };

  const gerenateSearchItem = () =>
    arrData.map((item: any) => {
      return (
        <div className={`h-16 flex justify-between items-center`} key={item.id}>
          <div className={`flex justify-center items-center`}>
            <Image
              className={`rounded-md`}
              src={item.imgIcon}
              width={50}
              height={50}
              alt="icon"
            />
            <div className={`mx-2 text-xl flex justify-center items-center`}>
              <span className="">{item.name}</span>
              <span className="">{item.path}</span>
            </div>
          </div>
          <div>{item.tips}</div>
        </div>
      );
    });

  useEffect(() => {
    console.log(123123123);
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
