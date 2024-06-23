import React, { useState } from "react";
import { LuMinus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrder,
  removeOrder,
} from "../../../redux/slides/orderSlide";
import { Checkbox } from "antd";
const OrderPage = () => {
  const [listChecked, setListChecked] = useState([]);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const onHandleChangeQuantity = (event, idProduct) => {
    if (event === "increase") {
      dispatch(increaseAmount(idProduct));
    }
    if (event === "decrease") {
      dispatch(decreaseAmount(idProduct));
    }
  };
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrder(idProduct));
  };
  const onhandleRemoveAllOrder = () => {
    if (Array.isArray(listChecked) && listChecked.length > 0) {
      dispatch(removeAllOrder(listChecked));
      setListChecked([]);
    }
  };
  // hàm này để giá trị input không thể nhỏ hơn 1
  const handleInputChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  const onchange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newList = listChecked.filter((item) => item !== e.target.value);
      setListChecked(newList);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };
  // console.log("listChecked", listChecked);
  const onhandleOnchangeCheckAll = (e) => {
    const newListCheck = [];
    if (e.target.checked) {
      const newList = order.orderItems.forEach((item) =>
        newListCheck.push(item.product)
      );
      setListChecked(newListCheck);
    } else {
      setListChecked([]);
    }
  };
  return (
    <div className="container mt-5 mb-16">
      <div className="mx-6">
        <h1 className="text-lg font-medium mb-3 ">Your Car</h1>
        <div className="w-full flex gap-8 mx-3">
          <div className="w-2/3 drop-shadow-2xl">
            <table className="table-fixed w-full text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 flex pl-2">
                    <Checkbox
                      onChange={onhandleOnchangeCheckAll}
                      checked={listChecked?.length === order?.orderItems.length}
                    />
                    <span className="text-sm ml-3 ">
                      Tất cả {order.orderItems.length} sp{" "}
                    </span>
                  </th>
                  <th className="border border-slate-300">Name</th>
                  <th className="border border-slate-300">Price</th>
                  <th className="border border-slate-300">Quantity</th>
                  <th className="border border-slate-300">TotalPrice</th>
                  <th className="border border-slate-300">
                    {" "}
                    <AiOutlineDelete
                      className="mx-auto text-xl cursor-pointer"
                      onClick={() => onhandleRemoveAllOrder()}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-slate-300 flex  pl-2">
                      <Checkbox
                        onChange={onchange}
                        value={item.product}
                        checked={listChecked.includes(item?.product)}
                      />

                      <img
                        src={item.image}
                        alt=""
                        className="w-[50px] h-[50px] mx-auto"
                      />
                    </td>
                    <td className="border border-slate-300">{item.name}</td>
                    <td className="border border-slate-300">
                      {" "}
                      {item.price.toLocaleString()} VNĐ
                    </td>
                    <td className="border border-slate-300">
                      <div className="flex justify-evenly">
                        <button
                          className="mt-1"
                          onClick={() =>
                            onHandleChangeQuantity("decrease", item.product)
                          }
                        >
                          <LuMinus />
                        </button>
                        <input
                          type="text"
                          value={item.amount}
                          onChange={handleInputChange}
                          className="w-10 mx-2 border border-black-600 text-center"
                        />
                        <button
                          className="mt-1"
                          onClick={() =>
                            onHandleChangeQuantity("increase", item.product)
                          }
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </td>
                    <td className="border border-slate-300">
                      {(item.price * item.amount).toLocaleString()} VND
                    </td>
                    <td className="border border-slate-300">
                      <AiOutlineDelete
                        className="mx-auto text-xl cursor-pointer"
                        onClick={() => handleDeleteOrder(item.product)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/3">
            <div className="bg-slate-100">
              <div className="p-5">
                <ul>
                  <li className="flex justify-between">
                    <span>Tạm tính</span> <span>0</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Giảm giá</span> <span>0</span>
                  </li>{" "}
                  <li className="flex justify-between">
                    <span>Thuế</span> <span>0</span>
                  </li>{" "}
                  <li className="flex justify-between">
                    <span>Phí giao hàng</span> <span>0</span>
                  </li>{" "}
                  <li className="flex justify-between">
                    <span>Tạm tính</span> <span>0</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-xl my-3">Tổng tiền</span>{" "}
                    <span className="text-xl my-3 text-red-700 font-medium">
                      33000đ
                    </span>
                  </li>
                </ul>
                <div className="text-center">
                  <button className="bg-red-500 text-white py-3 px-10">
                    Mua Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
