import React, { useEffect, useState } from "react";
import Heading from "../Shared/Heading";
import { Pagination } from "antd";
import ProductCard from "./ProductCard";
import Img1 from "../../assets/product/p-1.jpg";
import Img2 from "../../assets/product/p-2.jpg";
import Img3 from "../../assets/product/p-3.jpg";
import Img4 from "../../assets/product/p-4.jpg";
import Img5 from "../../assets/product/p-5.jpg";
import Img7 from "../../assets/product/p-7.jpg";
import Img9 from "../../assets/product/p-9.jpg";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Boat Headphones",
    price: "$120",
    asoDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Rocky Mountain",
    price: "$420",
    asoDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "Goggles",
    price: "$320",
    asoDelay: "300",
  },
  {
    id: 4,
    img: Img4,
    title: "Printed",
    price: "$220",
    asoDelay: "600",
  },
  {
    id: 5,
    img: Img5,
    title: "Printed",
    price: "$220",
    asoDelay: "600",
  },
  {
    id: 6,
    img: Img7,
    title: "Printed",
    price: "$220",
    asoDelay: "600",
  },
  {
    id: 7,
    img: Img9,
    title: "Printed",
    price: "$220",
    asoDelay: "600",
  },
];
const ShopProduct = () => {

  return (
    <div>
      <div data-aos="fade-up" className="container ">
        {/* Header section */}
        {/* <Heading title="Our Products" subtitle="Explore Our Products" /> */}
        {/* Body section */}
        <ProductCard data={ProductsData} />
      </div>
    </div>
  );
};

export default ShopProduct;
