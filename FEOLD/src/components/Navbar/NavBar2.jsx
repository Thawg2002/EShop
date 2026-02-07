import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllCategories } from "../../services/ProductServices";
import { Link } from "react-router-dom";

const NavBar2 = () => {
  // const renderContent = (type, options) => {
  //   switch (type) {
  //     case "text":
  //       return options.map((item, index) => {
  //         return <li key={index}>{item}</li>;
  //       });
  //     default:
  //       return {};
  //   }
  // };
  const getAllCategory = async () => {
    const data = await getAllCategories();
    return data;
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-2">
      <div className="">
        <div>
          <div>
            <h4 className="font-medium text-xl ">
              <Link to={"/shop/all"}>Danh mục sản phẩm</Link>
            </h4>
          </div>
          <ul className="leading-7 pl-2 cursor-pointer">
            {/* {renderContent("text", ["Tai nghe", "Máy tính", "Bàn phím"])} */}
            {data.data.map((item, index) => {
              return (
                <Link to={`/shop/${item}`} key={index}>
                  <li key={index}>{item}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        {/*  Dịch vụ*/}
        {/* <div className="space-y-6">
          <div>
            <h5 className="my-2 font-medium text-[16px]">Dịch vụ</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="flexCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckDefault"
              ></label>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar2;
