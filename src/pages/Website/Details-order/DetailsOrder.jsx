import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getDetailsOrder } from "../../../services/orderServices";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../../../utils";
import Loading from "../../../components/loading/loading";

const DetailsOrder = () => {
  const user = useSelector((state) => state.user);
  // console.log("user", user.access_token);
  const { id } = useParams();
  const fetchDetailsOrder = async () => {
    try {
      const data = await getDetailsOrder(id, user?.access_token);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["detailsorder"],
    queryFn: fetchDetailsOrder,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log("data", data);

  const {
    shippingAddress,
    shippingPrice,
    totalPrice,
    orderItems,
    paymentMethod,
    isPaid,
  } = data.data;
  return (
    <Loading isLoading={isLoading}>
      <div className="container mx-7">
        <div>
          <h1 className="font-bold text-lg">Details Order</h1>
          <div className="grid grid-cols-3 gap-8 my-4 ">
            <div className="bg-slate-50 shadow-lg p-4">
              <h4 className="font-medium text-lg ">Địa chỉ người nhận</h4>
              <div>
                <span>Name: {shippingAddress?.fullName}</span>
                <br />
                <span>Phone: {shippingAddress?.phone}</span>
                <br />
                <span> Address: {shippingAddress?.address}</span>
              </div>
            </div>{" "}
            <div className="bg-slate-50 shadow-lg p-4">
              <h4 className="font-medium text-lg ">HÌNH THỨC GIAO HÀNG</h4>
              <div>
                <br />
                <span>FAST : GIao hàng tiết kiệm</span>
                <br />
                <span>Phí giao hàng: {shippingPrice}</span>
              </div>
            </div>{" "}
            <div className="bg-slate-50 shadow-lg p-4">
              <h4 className="font-medium text-lg">HÌNH THỨC THANH TOÁN</h4>
              <div>
                <span className="text-orange-500">
                  {paymentMethod == "later_money"
                    ? "Thanh toán khi nhận hàng"
                    : paymentMethod == "paypal"
                    ? "Thanh toán bằng paypal"
                    : ""}
                </span>
              </div>
              <div>
                <span className="text-orange-500">
                  {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Sản phẩm */}
        <div>
          <table className="table-fixed w-full text-center">
            <thead>
              <tr>
                <th className="border border-slate-300">image</th>

                <th className="border border-slate-300">Name</th>
                <th className="border border-slate-300">Price</th>
                <th className="border border-slate-300">Quantity</th>
                <th className="border border-slate-300">TotalPrice</th>
              </tr>
            </thead>
            <tbody>
              {orderItems?.map((item, index) => {
                const totalPriceDetails = item.price * item.amount;
                return (
                  <tr className="my-3" key={index}>
                    <td>
                      <img src={item.image} alt="" className="w-[100px] " />
                    </td>

                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.amount}</td>
                    <td>{convertPrice(totalPriceDetails)}</td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </table>
          <div className="container">
            <div className="flex justify-end">
              <div>
                <p className="text-lg font-medium">
                  Phí vận chuyển: {convertPrice(shippingPrice)}
                </p>
                <p className="text-lg font-medium text-red-500">
                  Tổng cộng: {convertPrice(totalPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default DetailsOrder;
