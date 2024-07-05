import axios from "axios";

// export const getAllProduct = async () => {
//   const res = await axios.get(`${import.meta.env.VITE_SOME_URL_BACKEND}/products`);
//   return res.data;
// };
// export const getProductType = async (type) => {
//   if (type) {
//     const res = await axios.get(
//       `${import.meta.env.VITE_SOME_URL_BACKEND}/products?filter=categories&filter=${type}`
//     );
//     return res.data;
//   }
// };

export const getProductType = async (type, page = 0, limit = 8) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SOME_URL_BACKEND}/products?filter=categories&filter=${type}&page=${page}&limit=${limit}`
  );
  return res.data;
};
export const getAllProduct = async (page = 0, limit = 8) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SOME_URL_BACKEND}/products?page=${page}&limit=${limit}`
  );
  return res.data;
};
export const getAllCategories = async () => {
  const res = await axios.get(`${import.meta.env.VITE_SOME_URL_BACKEND}/categories`);
  return res.data;
};

export const addProduct = async (item) => {
  const res = await axios.post(`${import.meta.env.VITE_SOME_URL_BACKEND}/products`, item);
  return res.data;
};
export const getDetailProduct = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_SOME_URL_BACKEND}/products/${id}`);
  return res.data;
};
export const updateProduct = async (products, access_token) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SOME_URL_BACKEND}/products/${products._id}`,
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
  const res = await axios.delete(`${import.meta.env.VITE_SOME_URL_BACKEND}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
