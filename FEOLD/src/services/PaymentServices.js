import axios from "axios";

export const getConfig = async (products, access_token) => {
  const res = await axios.get(`${import.meta.env.VITE_SOME_URL_BACKEND}/payment/config`);
  return res.data;
};
