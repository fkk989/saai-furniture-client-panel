import React, { useEffect, useRef } from "react";
import { SofaSetDropDown } from "./SofaSetDropDown";
import { Link } from "react-router-dom";
import { useGetClient, useGetSubClient } from "../../hooks";
import { DashboardDropDown } from "../DashboardDropDown";
import { useRecoilValue } from "recoil";
import { isClient, isSubClient } from "../../store";

export const navObj: Array<{
  title?: string;
  component?: React.ReactNode;
  link: string;
}> = [
  {
    title: "dining set",
    link: "/dining",
  },
  {
    title: "blog",
    link: "/blog",
  },
  {
    title: "market area",
    link: "/market-area",
  },
];

export const Navbar = () => {
  const navbar = useRef<HTMLDivElement | null>(null);
  const { client } = useGetClient();
  const { subClient } = useGetSubClient();
  const is_client = useRecoilValue(isClient);
  const is_sub_client = useRecoilValue(isSubClient);

  useEffect(() => {
    let previousScroll = window.scrollY;
    window.addEventListener("scroll", () => {
      let currentScroll = window.scrollY;
      if (previousScroll >= currentScroll) {
        navbar!.current!.style.top = "0";
      } else {
        navbar!.current!.style.top = "-100px";
      }
      previousScroll = currentScroll;
    });
  });
  return (
    <div
      ref={navbar}
      className="max-mobile:hidden  fixed top-0 w-screen h-[100px] flex justify-between items-center transition-all delay-300 duration-300 pl-[20px] pr-[100px] bg-white shadowww z-[2]"
    >
      <Link to={"/sofa"}>
        <div className="flex justify-center items-center gap-[10px] text-[#731907] cursor-pointer">
          <img
            src={"/saai-Furniture-Art-logo.png"}
            alt="logo"
            className="w-[150px] h-[70px]"
          />
        </div>
      </Link>
      <div className="">
        <ul className="flex justify-between items-center gap-[30px] text-black">
          {client || subClient || is_client || is_sub_client ? (
            <li className="w-fit h-fit">
              <SofaSetDropDown />
            </li>
          ) : (
            <li className="text-[20px] font-bold hover:bg-[rgba(0,0,0,0.7)] p-[5px] pr-[15px] pl-[15px] hover:text-white rounded-lg cursor-pointer">
              Sofa Set
            </li>
          )}
          {navObj.map(({ title, link }, index) => {
            return (
              <Link to={link} key={index}>
                <li className="text-[20px] font-bold hover:bg-[rgba(0,0,0,0.7)] p-[5px] pr-[15px] pl-[15px] hover:text-white rounded-lg">
                  {title}
                </li>
              </Link>
            );
          })}

          {is_client || client ? (
            <Link to={"/all-sub-admin"}>
              <li className="text-[20px] font-bold hover:bg-[rgba(0,0,0,0.7)] p-[5px] pr-[15px] pl-[15px] hover:text-white rounded-lg">
                All Sub Admin
              </li>
            </Link>
          ) : (
            <li></li>
          )}

          {client || subClient || is_client || is_sub_client ? (
            <DashboardDropDown />
          ) : (
            <Link to={"/login"}>
              <li className="text-[20px] font-bold hover:bg-[rgba(0,0,0,0.7)] p-[5px] pr-[15px] pl-[15px] hover:text-white rounded-lg">
                Log In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};
