import axios from "axios";
import { axiosInstance } from "./UserServices";

export const createOrder = async (data, access_token) => {
  const res = await axiosInstance.post(
    `http://localhost:8080/api/order/create`,
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
    `http://localhost:8080/api/order/get-all-orders/${id}`,
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
    `http://localhost:8080/api/order/get-details-order/${id}`,
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
    `http://localhost:8080/api/order/cancel/${id}`,
    { data: orderItems },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
