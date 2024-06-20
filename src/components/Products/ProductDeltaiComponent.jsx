import React from "react";
import Image1 from "../../assets/product/p-1.jpg";
import { PiStarThin } from "react-icons/pi";
import { LuMinus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getDetailProduct } from "../../services/ProductServices";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import Loading from "../loading/loading";
// import { baseUrl } from "./config";
const ProductDeltaiComponent = () => {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img className="w-[100%]" src={"https://picsum.photos/200"} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { id } = useParams();
  const getProductById = async () => {
    const res = await getDetailProduct(id);
    return res.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["productsbyid"],
    queryFn: getProductById,
  });
  // console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onHandleChangeQuantity = (event) => {
    // Get the new quantity value from the input
    const newQuantity = event.target.value;

    // Update the quantity state or do something with the new quantity value
    // ...
  };

  const renderStars = (number) => {
    const stars = [];
    for (let i = 0; i < number; i++) {
      stars.push(<PiStarThin key={i} className="text-yellow-500" />);
    }
    return stars;
  };

  return (
    <Loading isLoading={isLoading}>
      <div className="container">
        <div className="flex flex-row gap-3 my-9">
          {/* img */}
          <div className="w-2/5">
            {/* image detail */}
            <div className="slider-container">
              <Slider {...settings}>
                <div>
                  <img
                    className="w-[100%] h-[500px] object-cover"
                    src={data.image}
                  />
                </div>
                <div>
                  <img
                    className="w-[100%] h-[500px] object-cover"
                    src={"https://picsum.photos/200"}
                  />
                </div>
                <div>
                  <img
                    className="w-[100%] h-[500px] object-cover"
                    src={"https://picsum.photos/200"}
                  />
                </div>
                <div>
                  <img
                    className="w-[100%] h-[500px] object-cover"
                    src={"https://picsum.photos/200"}
                  />
                </div>
              </Slider>
            </div>
          </div>
          {/* content */}
          <div className="w-3/5 ml-7">
            <h2 className="text-2xl font-bold text-[#324d67] dark:text-white uppercase">
              {data.name}
            </h2>
            <div className="flex my-2 align-center">
              {renderStars(data.rating)} <span className="ml-2">| đã bán 1000+</span>
            </div>
            {/* Mô tả */}
            <div className="mb-2">
              <h4 className="capitalize text-xl font-bold text-[#324d67] dark:text-white">
                Details:
              </h4>
              <p className="text-gray-600">{data.description}</p>
            </div>
            {/* Gía */}
            <div className="mb-2">
              <span className="text-red-500 font-bold text-[25px] my-3 mr-5">
                {data?.selled} VND
              </span>
              <span className="text-black font-bold text-[20px] my-3 line-through">
                {data.price} VND
              </span>
            </div>
            {/* Số lượng */}
            <div className="mb-2">
              <h4 className="text-xl font-bold text-[#324d67] dark:text-white capitalize">
                Quantity:
              </h4>
              <div className="flex mt-[10px] ml-[10px]">
                <span className="mt-1">
                  <FiPlus />
                </span>
                <input
                  type="text"
                  value={4}
                  onChange={onHandleChangeQuantity}
                  className="w-10 mx-2 border border-black-600 text-center"
                />
                <span className="mt-1">
                  <LuMinus />
                </span>
              </div>
            </div>
            {/* Buton order */}
            <div className="my-7">
              <button className="border border-red-600 bg-slate-50 text-red-600 font-medium w-[170px] h-[50px] text-[18px] hover:scale-105">
                Add to Cart
              </button>
              <button className="border border-collapse font-medium w-[170px] h-[50px] text-[18px] bg-red-600 text-white ml-7 hover:scale-105">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default ProductDeltaiComponent;
