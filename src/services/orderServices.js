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
export const getAllOrderDetailsById = async (id, access_token) => {
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
