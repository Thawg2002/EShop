import React, { useEffect, useMemo, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// import { PayPalButton } from "react-paypal-button-v2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrder,
  removeOrder,
  selectedOrder,
} from "../../../redux/slides/orderSlide";
import { Checkbox, Radio, message } from "antd";
import { convertPrice } from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../../services/orderServices";
import { getConfig } from "../../../services/PaymentServices";
import { error } from "../../../components/Message/message";
const PaymentPage = () => {
  const [listChecked, setListChecked] = useState([]);
  const [sdkReady, setSdkReady] = useState(false);

  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log("order", order);

  const handleDilivery = (e) => {
    setDelivery(e.target.value);
  };
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  // tổng giá
  const priceMemo = useMemo(() => {
    const result = order?.orderItemSelected.reduce((total, current) => {
      return total + current.price * current.amount;
    }, 0);
    return result;
  }, [order]);
  // phí giao hàng
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo < 200000 && order?.orderItemSelected.length > 0) {
      return 20000;
    } else if (priceMemo >= 200000 && priceMemo <= 500000) {
      return 10000;
    } else if (priceMemo > 500000) {
      return 0;
    } else {
      return 0;
    }
  }, [priceMemo]);

  //Tổng tiền
  const totalPriceMemo = useMemo(() => {
    return priceMemo + diliveryPriceMemo;
  }, [priceMemo, diliveryPriceMemo]);

  // Add cart
  const onhandleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      priceMemo &&
      user?.id
    ) {
      mutation.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: "Hà Nội",
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
      });
    }
  };
  // console.log("order", order);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const { token, ...orderData } = data;
      const res = await createOrder(orderData, token);
      return res;
    },
    onSuccess: () => {
      const arrayOrrder = [];
      order?.orderItemSelected?.forEach((element) => {
        arrayOrrder.push(element.product);
      });
      dispatch(removeAllOrder(arrayOrrder));
      message.success("Đặt hàng thành công");
      navigate("/orderSucess", {
        state: {
          delivery,
          totalPriceMemo,
          payment,
          orders: order?.orderItemSelected,
        },
      });
    },
    onError: (error) => {
      message.error("Đặt hàng thất bại");
    },
  });
  // const addPaypalScript = async () => {
  //   const { data } = await getConfig();
  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  //   script.async = true;
  //   script.onload = () => {
  //     setSdkReady(true);
  //   };
  //   document.body.appendChild(script);
  // };
  // const onSuccessPaypal = (details, data) => {
  //   if (
  //     user?.access_token &&
  //     order?.orderItemSelected &&
  //     user?.name &&
  //     user?.address &&
  //     user?.phone &&
  //     priceMemo &&
  //     user?.id
  //   ) {
  //     mutation.mutate({
  //       token: user?.access_token,
  //       orderItems: order?.orderItemSelected,
  //       fullName: user?.name,
  //       address: user?.address,
  //       phone: user?.phone,
  //       city: "Hà Nội",
  //       paymentMethod: payment,
  //       itemsPrice: priceMemo,
  //       shippingPrice: diliveryPriceMemo,
  //       totalPrice: totalPriceMemo,
  //       user: user?.id,
  //       isPaid: true,
  //       paidAt: details.update_time,
  //     });
  //   }
  // };
  // useEffect(() => {
  //   if (!window.paypal) {
  //     addPaypalScript();
  //   } else {
  //     setSdkReady(true);
  //   }
  // }, []);

  const onSuccessPaypal = (details, data) => {
    if (
      user?.access_token &&
      order?.orderItemSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      priceMemo &&
      user?.id
    ) {
      mutation.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: "Hà Nội",
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        isPaid: true,
        paidAt: details.update_time,
      });
    }
  };

  const addPaypalScript = async () => {
    try {
      const { data } = await getConfig();
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    } catch (err) {
      console.error("Failed to load PayPal script:", err);
    }
  };

  useEffect(() => {
    addPaypalScript();
  }, []);
  return (
    <div className="container mt-5 mb-16">
      <div className="mx-6">
        <h1 className="text-lg font-medium mb-3 ">Thanh toán</h1>
        <div className="w-full flex gap-8 mx-3">
          <div className="w-2/3">
            <div className=" drop-shadow-lg">
              <label htmlFor="">
                Chọn phương thức giao hàng <br />
                <Radio.Group
                  className="bg-slate-50 pl-3 inline-block pr-16 py-5 mt-3"
                  onChange={handleDilivery}
                  value={delivery}
                >
                  <Radio value="fast">
                    <span>FAST Giao hàng tiết kiệm </span>
                  </Radio>
                  <br />
                  <Radio value="gojek">
                    <span>GO_JEK Giao hàng tiết kiệm</span>
                  </Radio>
                </Radio.Group>
              </label>
            </div>
            <div className=" drop-shadow-lg mt-3">
              <label htmlFor="">
                Chọn phương thức thanh toán <br />
                <Radio.Group
                  className="bg-slate-50 pl-3 inline-block pr-16 py-5 mt-3"
                  onChange={handlePayment}
                  value={payment}
                >
                  <Radio value="later_money">
                    <span>Thanh toán khi nhận hàng</span>
                  </Radio>
                  <br />
                  <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                  <br />
                </Radio.Group>
              </label>
            </div>
          </div>
          <div className="w-1/3">
            {/* checkout */}
            <div className="bg-slate-50">
              <div className="p-5">
                <div className="my-3">
                  Địa chỉ giao hàng:{" "}
                  <strong className="text-lg text-blue-800">
                    {user?.address}
                  </strong>
                  <Link
                    className="p-2 text-sm text-blue-700"
                    to={"/profile-user"}
                  >
                    Thay đổi
                  </Link>
                </div>
                <ul>
                  <li className="flex justify-between">
                    <span>Tạm tính</span> <span>{convertPrice(priceMemo)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Phí giao hàng</span>{" "}
                    <span>{convertPrice(diliveryPriceMemo)}</span>
                  </li>{" "}
                  <li className="flex justify-between">
                    <span>Tạm tính</span>{" "}
                    <span>{convertPrice(totalPriceMemo)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-xl my-3">Tổng tiền</span>{" "}
                    <span className="text-xl my-3 text-red-700 font-medium">
                      {convertPrice(totalPriceMemo)}
                    </span>
                  </li>
                </ul>

                <div className="text-center">
                  {payment === "paypal" && sdkReady ? (
                    // <PayPalButton
                    //   amount={totalPriceMemo}
                    //   // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    //   onSuccess={onSuccessPaypal}
                    //   onError={(err) => {
                    //     alert("Đã xảy ra lỗi, vui lòng thử lại sau!");
                    //   }}
                    // />
                    <PayPalScriptProvider
                      options={{ "client-id": "YOUR_CLIENT_ID" }}
                    >
                      <PayPalButtons
                        style={{ layout: "horizontal" }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: totalPriceMemo,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            onSuccessPaypal(details, data);
                          });
                        }}
                        onError={(err) => {
                          console.error("PayPal error:", err);
                          message.error(
                            "Đã xảy ra lỗi khi thanh toán qua PayPal."
                          );
                        }}
                      />
                    </PayPalScriptProvider>
                  ) : (
                    <button
                      className="bg-red-500 text-white text-[20px] py-3 px-10 w-full mt-2"
                      onClick={() => onhandleAddOrder()}
                    >
                      Place Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
