import React from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";

const Products = ({ products }) => {
  const displayedProducts = products.slice(0, 4);
  return (
    <div>
      <div data-aos="fade-up" className="container mt-2">
        {/* Header section */}
        <Heading title="Our Products" subtitle="Explore Our Products" />
        {/* Body section */}
        <ProductCard data={displayedProducts} />
      </div>
    </div>
  );
};

export default Products;
