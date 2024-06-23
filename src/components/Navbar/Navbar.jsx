import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";
import { FaUserXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Button, ConfigProvider, Popover } from "antd";
const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Shop",
    link: "/shop/all",
  },
  {
    id: 3,
    name: "About",
    link: "/about",
  },
  {
    id: 4,
    name: "Blogs",
    link: "/blog",
  },
];
const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/#" },
  { id: 2, name: "Best Selling", link: "/#" },
  { id: 3, name: "Top Rated", link: "/#" },
];

const handleLogout = async (req, res) => {
  try {
    localStorage.removeItem("access_token");
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
};

//thông tin use
const buttonWidth = 10;
// Nội dung của Popover
const content = (user) => (
  <div>
    {user?.isAdmin && (
      <Link to={"/admin"}>
        <p className="cursor-pointer py-1 hover:text-red-700">Admin Page</p>
      </Link>
    )}
    <Link to={"/profile-user"}>
      <p className="cursor-pointer py-1 hover:text-red-700">
        Personal Information
      </p>
    </Link>
    <p className="cursor-pointer hover:text-red-700" onClick={handleLogout}>
      Log out
    </p>
  </div>
);
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  // console.log("user: ", user);
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and Links section */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
              to="/"
            >
              EShop
            </Link>
            {/* Menu Items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={item.link}
                        className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration:700"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
                {/* Dropdown */}
                <li className="relative cursor-pointer group">
                  <a
                    href="#"
                    className=" flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2"
                  >
                    Quick Links
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300" />
                    </span>
                  </a>
                  {/* Dropdown Links */}
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white">
                    <ul className="space-y-2">
                      {DropdownLinks.map((item, index) => (
                        <li key={index}>
                          <Link
                            className="text-gray-500 hover:text-black dark:hover:text-white duration-200 p-2 hover:bg-primary/20 inline-block w-full rounded-md font-semibold"
                            to={item.link}
                          >
                            {" "}
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Navbar Right section */}
          <div className="flex justify-between items-center gap-4">
            {/* Search Bar section */}
            <div className="relative group hidden sm:block ">
              <input type="text" placeholder="Seach" className="search-bar" />
              <IoMdSearch className="text-xl text-gray-600 group-hover:text-pretty dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200 " />
            </div>
            {/* Orrder-button section*/}
            <Link to={"/order"} className="relative p-3">
              <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400 " />
              <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                {order.orderItems.length}
              </div>
            </Link>
            <div>
              {user?.name ? (
                <div
                  style={{
                    marginInlineStart: buttonWidth,
                    clear: "both",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Popover placement="bottom" content={content(user)}>
                    <Button className="border-none">{user.name}</Button>
                  </Popover>
                </div>
              ) : (
                <Link to={"/signin"}>
                  <FaUserXmark className="w-8 " />
                </Link>
              )}
            </div>

            {/* Dark Mode section*/}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
