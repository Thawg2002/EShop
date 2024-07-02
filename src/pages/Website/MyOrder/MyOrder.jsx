import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../components/loading/loading";
import {
  cancelDetailsOrder,
  getAllOrderDetail,
} from "../../../services/orderServices";
import { convertPrice } from "../../../utils";
import { success, error } from "../../../components/Message/message";
const MyOrder = () => {
  const user = useSelector((state) => state.user);

  const getAllOrderDetails = async () => {
    const data = await getAllOrderDetail(user?.id, user?.access_token);
    return data;
  };
  const mutation = useMutation({
    mutationFn: async (data) => {
      const { id, token, orderItems } = data;
      const res = await cancelDetailsOrder(id, token, orderItems);
      return res;
    },
    onSuccess: () => {
      success("Hủy thành công");
    },
    onError: () => {
      error("Hủy thất bại");
      // console.log(error.message);
    },
  });
  const onhandleCancel = (order) => {
    mutation.mutate({
      id: order._id,
      token: user?.access_token,
      orderItems: order.orderItems,
    });
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["orderbyid"],
    queryFn: getAllOrderDetails,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // console.log("data", data.data);

  return (
    <Loading isLoading={isLoading}>
      <div className="container mt-5 mb-16">
        <div className="mx-6">
          <h1 className="text-lg font-medium mb-3 ">My Order</h1>
          <div>
            {data.data?.map((order, index) => (
              <div key={index} className="border-b-2 pb-5 mb-5">
                <div className="flex justify-between">
                  <div>
                    <p>Trạng thái</p>

                    <p className="">
                      Giao hàng:
                      {`${
                        order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"
                      }`}
                    </p>
                    <p className="text-sm">
                      {/* Thanh toán:{" "}
                      {`${order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}`} */}
                    </p>
                  </div>
                  <div>
                    <p>Phí Ship : {convertPrice(order.shippingPrice)}</p>
                    <p className="text-lg font-medium">
                      Total: {convertPrice(order?.totalPrice)}
                    </p>
                    <p className="text-sm">
                      Status:{" "}
                      {`${order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}`}
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  {order.orderItems.map((item, index) => {
                    const totalPrice = item.price * item.amount;

                    return (
                      <div key={index} className="flex justify-between mb-2">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-lg font-medium">{item.name}</p>
                          <p className="text-sm">
                            Price: {convertPrice(item.price)}
                          </p>
                          <p className="text-sm">Quantity: {item.amount}</p>
                          <p className="text-sm">
                            Total: {convertPrice(totalPrice)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => onhandleCancel(order)}
                    className="border border-spacing-1  border-red-400 text-red-700 px-5 py-2 mx-2 font-medium hover:bg-red-700 hover:text-white"
                  >
                    Huỷ đơn hàng
                  </button>
                  <Link
                    to={`/details-order/${order._id}`}
                    className="border border-spacing-1 border-cyan-400 text-cyan-700  px-5 py-2 mx-2 font-medium hover:bg-cyan-700 hover:text-white  "
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default MyOrder;
