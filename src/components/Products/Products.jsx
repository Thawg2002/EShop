import React from "react";
import Img1 from "../../assets/product/p-1.jpg";
import Img2 from "../../assets/product/p-2.jpg";
import Img3 from "../../assets/product/p-3.jpg";
import Img4 from "../../assets/product/p-4.jpg";
import Img5 from "../../assets/product/p-5.jpg";
import Img7 from "../../assets/product/p-7.jpg";
import Img9 from "../../assets/product/p-9.jpg";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";
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
const Products = ({ products }) => {
  // const [product, setProduct] = useState([]);
  // useEffect(() => {
  //   const getProduct = async () => {
  //     const res = await fetch("http://localhost:3000/products");
  //     const data = await res.json();
  //     // console.log(data);
  //     setProduct(data);
  //   };
  //   getProduct();
  // }, []);
  // console.log("data", products);
  return (
    <div>
      <div data-aos="fade-up" className="container mt-2">
        {/* Header section */}
        <Heading title="Our Products" subtitle="Explore Our Products" />
        {/* Body section */}
        <ProductCard data={products} />
      </div>
    </div>
  );
};

export default Products;
