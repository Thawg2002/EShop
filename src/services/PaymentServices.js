import axios from "axios";

export const getConfig = async (products, access_token) => {
  const res = await axios.get(`http://localhost:8080/api/payment/config`);
  return res.data;
};
