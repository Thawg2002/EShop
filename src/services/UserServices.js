import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SOME_URL_BACKEND}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const signupUser = async (user) => {
  const res = await axiosInstance.post("/signup", user);
  return res.data;
};

export const loginUser = async (user) => {
  const res = await axiosInstance.post("/signin", user, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return res.data;
};
export const getdetailUser = async (id, access_token) => {
  const res = await axiosInstance.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const refreshToken = async () => {
  try {
    const res = await axiosInstance.post("/refresh-token", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Ném lỗi để phía gọi refreshToken có thể xử lý
  }
};
// export const logoutUser = async () => {
//   try {
//     const res = await axios.post("/log-out");
//     return res.data;
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     throw error; // Ném lỗi để phía gọi refreshToken có thể xử lý
//   }
// };

export const updateUserSV = async (user) => {
  const res = await axiosInstance.put(`/update-user/${user._id}`, user);
  return res.data;
};
export const getAllUserSV = async (access_token) => {
  const res = await axios.get(`${import.meta.env.VITE_SOME_URL_BACKEND}/user`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
export const deleteUser = async (id, access_token) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SOME_URL_BACKEND}/delete-user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
// export const updateUser = async (user, access_token) => {
//   const res = await axios.put(
//     `${import.meta.env.VITE_SOME_URL_BACKEND}/update-user/${user._id}`,
//     user,
//     {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     }
//   );
//   return res.data;
// };
