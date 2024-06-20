import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../services/ProductServices";

const ShopProduct = () => {
  const fetchProductAll = async () => {
    const res = await getAllProduct();
    return res.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <div className="container ">
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
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;
