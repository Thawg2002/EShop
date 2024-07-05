import React, { useState } from "react";
import Image1 from "../../assets/product/p-1.jpg";
import { PiStarThin } from "react-icons/pi";
import { LuMinus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getDetailProduct } from "../../services/ProductServices";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import Loading from "../loading/loading";
import { Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { API_URL_BACKEND, convertPrice, IS_LOCAL } from "../../utils";
import { success } from "../Message/message";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";
const ProductDeltaiComponent = () => {
  const user = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  //Slider product
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img className="" src={"https://picsum.photos/200"} />
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
  const onHandleChangeQuantity = (event) => {
    if (event === "increase") {
      setQuantity(quantity + 1);
    }
    if (event === "decreate") {
      setQuantity(quantity - 1);
    }
  };
  // hàm này để giá trị input không thể nhỏ hơn 1
  const handleInputChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };
  const getProductById = async () => {
    const res = await getDetailProduct(id);
    return res.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["productsbyid"],
    queryFn: getProductById,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onhandleAddCart = () => {
    if (!user?.id) {
      navigate("/signin");
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: data?.name,
            amount: quantity,
            image: data?.image,
            price: finalPrice,
            discount: data?.discount,
            product: data?._id,
          },
        })
      );
      success("Thêm vào giỏ hàng thành công");
    }
  };
  const finalPrice = data.price - (data.price * data.discount) / 100;

  // console.log("API URL:", API_URL_BACKEND);
  // console.log("Is Local:", IS_LOCAL);
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
                    src={"https://picsum.photos/600"}
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
              <Rate allowHalf defaultValue={data.rating} />
              <span className="ml-2">| đã bán {data.selled}</span>
            </div>
            {/* Mô tả */}
            <div className="mb-2">
              <h4 className="capitalize text-xl font-bold text-[#324d67] dark:text-white">
                description:
              </h4>
              <p className="text-gray-600">{data.description}</p>
            </div>
            {/* Gía */}
            <div className="mb-2">
              <span className="text-red-500 font-bold text-[25px] my-3 mr-5">
                {convertPrice(finalPrice)}
              </span>
              <span className="text-black font-bold text-[20px] my-3 line-through">
                {convertPrice(data.price)}
              </span>
            </div>
            {/* Số lượng */}

            <div className="mb-2">
              <h4 className="text-xl font-bold text-[#324d67] dark:text-white capitalize">
                Quantity: {data.quantity}
              </h4>
              <div className="flex mt-[10px] ml-[10px]">
                <button
                  className="mt-1"
                  onClick={() => onHandleChangeQuantity("decreate")}
                >
                  <LuMinus />
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleInputChange}
                  className="w-10 mx-2 border border-black-600 text-center"
                />
                <button
                  className="mt-1"
                  onClick={() => onHandleChangeQuantity("increase")}
                >
                  <FiPlus />
                </button>
              </div>
            </div>
            {/* Buton order */}
            <div className="my-7">
              <button
                className="border border-red-600 bg-slate-50 text-red-600 font-medium w-[170px] h-[50px] text-[18px] hover:scale-105"
                onClick={onhandleAddCart}
              >
                Add to Cart
              </button>
              <button className="border border-collapse font-medium w-[170px] h-[50px] text-[18px] bg-red-600 text-white ml-7 hover:scale-105">
                Buy Now
              </button>
            </div>
            <div>
              <LikeButtonComponent
                datahref={
                  IS_LOCAL
                    ? `https://developers.facebook.com/docs/plugins/`
                    : window.location.href
                }
              />
            </div>
          </div>
        </div>
        <div className="">
          <CommentComponent
            datahref={
              IS_LOCAL
                ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                : window.location.href
            }
            width="100%"
          />
        </div>
      </div>
    </Loading>
  );
};

export default ProductDeltaiComponent;
