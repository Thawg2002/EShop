import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get(`http://localhost:8080/api/products`);
  return res.data;
};
export const addProduct = async (item) => {
  const res = await axios.post(`http://localhost:8080/api/products`, item);
  return res.data;
};
export const getDetailProduct = async (id) => {
  const res = await axios.get(`http://localhost:8080/api/products/${id}`);
  return res.data;
};
export const updateProduct = async (products, access_token) => {
  const res = await axios.put(
    `http://localhost:8080/api/products/${products._id}`,
    products,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const deleteProduct = async (id, access_token) => {
  const res = await axios.delete(`http://localhost:8080/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
