import React, { useEffect, useState } from "react";
import NavBar2 from "../../../components/Navbar/NavBar2";
import Products from "../../../components/Products/Products";
import ShopProduct from "../../../components/Products/ShopProduct";
import { useLocation } from "react-router-dom";
import {
  getAllProduct,
  getProductType,
} from "../../../services/ProductServices";

const ShopPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // console.log("location", location);
  const fetchProductType = async (category) => {
    try {
      const res = await getProductType(category);
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const fetchAllProducts = async () => {
    try {
      const res = await getAllProduct();
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch all products:", error);
    }
  };
  useEffect(() => {
    const category = location.pathname.split("/").pop();
    setSelectedCategory(category);
    if (category) {
      if (category === "all") {
        fetchAllProducts();
      }
      fetchProductType(category);
    } else {
      fetchAllProducts();
    }
  }, [location]);
  return (
    <div className="container">
      <div className="flex">
        <div className="w-[300px]">
          <NavBar2 />
        </div>
        <div className="">
          <ShopProduct products={products} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
