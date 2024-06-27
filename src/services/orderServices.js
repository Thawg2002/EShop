import axios from "axios";

export const createOrder = async (data, access_token) => {
  const res = await axios.post(`http://localhost:8080/api/order/create`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;  
};
