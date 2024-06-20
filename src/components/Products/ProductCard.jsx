import { Link } from "react-router-dom";
import Button from "../Shared/Button";

const ProductCard = ({ data }) => {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
        {/* Cart section */}
        {data.map((item, index) => (
          <div className="group" key={index}>
            <div className="relative ">
              <img
                src={item.image}
                alt=""
                className="h-[180px] w-[260px] object-cover rounded-md "
              />
              {/* hover button */}
              <Link
                to={`/product-detail/${item._id}`}
                className=" hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200"
              >
                <button
                  className={` cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 text-white `}
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
      </div>
      {/* <div className="text-center my-4">
        <button className="border-2 border-sky-500 font-light p-2 rounded-xl w-[200px] hover:bg-sky-500 hover:text-white">
          Xem Thêm
        </button>
      </div> */}
    </div>
  );
};

export default ProductCard;
