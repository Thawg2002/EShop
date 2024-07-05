import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import UserList from "./Users/UserList";
import ProductList from "./Products/ProductList";
import { BsCart3 } from "react-icons/bs";
const items = [
  {
    key: "user",
    label: <Link to={"/admin/user"}>Users</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "product",
    label: <Link to={"/admin/product"}>Products</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "order",
    label: <Link to={"/admin/order"}>Order</Link>,
    icon: <BsCart3 />,
  },
];
// const renderPage = (key) => {
//   switch (key) {
//     case "user":
//       return <UserList />;
//     case "product":
//       return <ProductList />;
//     default:
//       return <></>;
//   }
// };
const LayoutAdmin = () => {
  const user = useSelector((state) => state.user);
  const [current, setCurrent] = useState("1");
  const onClick = ({ key }) => {
    // console.log("key ", key);
    setCurrent(key);
  };
  return (
    <div className="flex gap-[20px]">
      <div className="h-screen border-solid border-2 border-spacing-1">
        <div className="text-center mt-3">
          <h2 className="text-lg text-black shadow-sm">
            Wellcome {user?.name}
          </h2>
        </div>
        <br />
        <Menu
          onClick={onClick}
          style={{
            width: 256,
          }}
          defaultOpenKeys={["sub4"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
        <div className="absolute bottom-0 pl-4 pb-6">
          <EnterOutlined />{" "}
          <Link to={"/"} className="hover:text-red-600">
            The Website
          </Link>
        </div>
      </div>
      <div className="flex-1">
        {/* {renderPage(current)} */}
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAdmin;
