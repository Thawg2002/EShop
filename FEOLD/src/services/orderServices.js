import axios from "axios";
import { axiosInstance } from "./UserServices";

export const createOrder = async (data, access_token) => {
  const res = await axiosInstance.post(
    `${import.meta.env.VITE_SOME_URL_BACKEND}/order/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const getAllOrderDetail = async (id, access_token) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SOME_URL_BACKEND}/order/get-all-order-detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const getDetailsOrder = async (id, access_token) => {
  const res = await axiosInstance.get(
    `${import.meta.env.VITE_SOME_URL_BACKEND}/order/get-details-order/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const cancelDetailsOrder = async (id, access_token, orderItems) => {
  const res = await axiosInstance.delete(
    `${import.meta.env.VITE_SOME_URL_BACKEND}/order/cancel/${id}`,
    { data: orderItems },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const getAllOrders = async (access_token) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SOME_URL_BACKEND}/order/get-all-orders`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
