import { Link } from "react-router-dom";
import Button from "../Shared/Button";
import Slider from "react-slick";
import { Pagination } from "antd";
const ProductCard = ({ data }) => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mb-10">
      <div className=" gap-5 place-items-center">
        <div className="slider-container mx-auto text-center">
          <Slider {...settings}>
            {/* Cart section */}
            {data.map((item, index) => (
              <div className="group  gap-5" key={index}>
                <div className="relative ">
                  <img
                    src={item.image}
                    alt=""
                    className=" mx-auto h-[180px] w-[260px] object-cover rounded-md "
                  />
                  {/* hover button */}
                  <Link
                    to={`/product-detail/${item._id}`}
                    className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200"
                  >
                    <button
                      className={` cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 text-white text-lg`}
                    >
                      Chi tiết
                    </button>
                  </Link>
                </div>
                <div className="leading-7">
                  <h2 className="font-bold">{item.name}</h2>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
