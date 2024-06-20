import React from "react";
import NavBar2 from "../../../components/Navbar/NavBar2";
import Products from "../../../components/Products/Products";
import ShopProduct from "../../../components/Products/ShopProduct";

const ShopPage = () => {
  return (
    <div className="container">
      <div className="flex">
        <div className="w-[300px]">
          <NavBar2 />
        </div>
        <div className="">
          <ShopProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
