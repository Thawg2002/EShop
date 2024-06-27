import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { convertPrice } from "../../../utils";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../../contant";
import { Table } from "antd";
const OrderSucess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;
  // console.log("state", state);

  return (
    <div className="container mt-5 mb-16">
      <div className="mx-6">
        <h1 className="text-lg font-medium mb-3 ">Đơn hàng đặt thành công</h1>
        <div className="mx-7">
          <div className=" drop-shadow-lg">
            <label htmlFor="">
              <strong> Phương thức giao hàng</strong> <br />
              <div className=" pl-3  pr-16 py-3 mt-3 ">
                <span className="bg-blue-100 py-3 px-5">
                  {orderContant.delivery[state?.delivery]}{" "}
                </span>
              </div>
            </label>
          </div>
          <div className=" drop-shadow-lg">
            <label htmlFor="">
              <strong>Phương thức thanh toán</strong>
              <div className=" pl-3  pr-16 py-3 mt-3 ">
                <span className="bg-blue-100 py-3 px-5">
                  {orderContant.payment[state?.payment]}
                </span>
              </div>
            </label>
          </div>
          <div className="drop-shadow-2xl     border-neutral-300 border-t-orange-100">
            <table className="table-fixed w-full text-center mt-3">
              {/* <thead>
                <tr>
                  <th className="border border-slate-300">image</th>
                  <th className="border border-slate-300">Name</th>
                  <th className="border border-slate-300">Price</th>
                  <th className="border border-slate-300">Quantity</th>
                </tr>
              </thead> */}
              <tbody>
                {state?.orders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" flex  pl-2">
                        <img
                          src={item.image}
                          alt=""
                          className="w-[50px] h-[50px] mx-auto"
                        />
                      </td>
                      <td className="">{item.name}</td>
                      <td className="">{convertPrice(item.price)}</td>
                      <td className="">{item.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-8 flex right-0">
              <strong>Tổng tiền</strong> :{" "}
              <span className="text-lg text-red-500 ml-2">{convertPrice(state?.totalPriceMemo)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSucess;
