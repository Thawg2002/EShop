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
  const [panigation, setPanigation] = useState({
    page: 1,
    limit: 8,
    total: 1,
  });
  // console.log("location", location);
  const fetchProductType = async (category, page = 1, limit = 8) => {
    try {
      const res = await getProductType(category, page - 1, limit);
      // console.log("res", res);
      setProducts(res.data);
      setPanigation((prev) => ({ ...prev, total: res.total }));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchAllProducts = async (page = 1, limit = 8) => {
    try {
      const res = await getAllProduct(page - 1, limit);
      // console.log("res", res);
      setProducts(res.data);
      setPanigation((prev) => ({ ...prev, total: res.total }));
    } catch (error) {
      console.error("Failed to fetch all products:", error);
    }
  };
  useEffect(() => {
    const category = location.pathname.split("/").pop();
    setSelectedCategory(category);
    setPanigation((prev) => ({ ...prev, page: 1 }));
    if (category) {
      if (category === "all") {
        fetchAllProducts(1, panigation.limit);
      } else {
        fetchProductType(category, 1, panigation.limit);
      }
    } else {
      fetchAllProducts(1, panigation.limit);
    }
  }, [location]);
  // console.log("panigation", panigation);
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "all") {
      fetchProductType(selectedCategory, panigation.page, panigation.limit);
    } else {
      fetchAllProducts(panigation.page, panigation.limit);
    }
  }, [panigation.page, panigation.limit]);

  const handlePageChange = (page, pageSize) => {
    setPanigation((prev) => ({ ...prev, page, limit: pageSize }));
  };
  return (
    <div className="container my-7">
      <div className="flex">
        <div className="w-[300px]">
          <NavBar2 />
        </div>
        <div className="">
          <ShopProduct
            products={products}
            panigation={panigation}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
