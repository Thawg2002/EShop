import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProductAdd from "./pages/Admin/Products/ProductAdd";
import ProductList from "./pages/Admin/Products/ProductList";
import ProductUpdate from "./pages/Admin/Products/ProductUpdate";
import UserAdd from "./pages/Admin/Users/UserAdd";
import UserList from "./pages/Admin/Users/UserList";
import UserUpdate from "./pages/Admin/Users/UserUpdate";
import LayoutAdmin from "./pages/Admin/layoutAdmin";
import NotFound from "./pages/NotFoundPage/NotFound";
import About from "./pages/Website/About/About";
import Signin from "./pages/Website/Auth/Signin";
import Signup from "./pages/Website/Auth/Signup";
import BlogPage from "./pages/Website/Blog/BlogPage";
import OrderPage from "./pages/Website/Order/OrderPage";
import ProductDetai from "./pages/Website/Product/ProductDetailPage";
import ProfilePage from "./pages/Website/Profile/ProfilePage";
import ShopPage from "./pages/Website/Shop/ShopPage";
import LayoutWebSite from "./pages/Website/layout";
import { updateUser } from "./redux/slides/userSlider";
import {
  axiosInstance,
  getdetailUser,
  refreshToken,
} from "./services/UserServices";
import { isJsonString } from "./utils";
import HomePage from "./pages/Website/HomePage/Home";

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

let failedQueue = [];
let isRefreshing = false;
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { decoded, storageData } = handleDecoded();
    if (decoded?.id && storageData) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, [dispatch]);

  // let isRefreshing = false;

  axiosInstance.interceptors.request.use(
    async (config) => {
      const { storageData, decoded } = handleDecoded();
      if (storageData) {
        const decodedToken = jwtDecode(storageData);
        const currentTime = new Date().getTime() / 1000;
        if (decodedToken.exp < currentTime) {
          // console.log("hết hạn ");

          if (!isRefreshing) {
            isRefreshing = true;
            try {
              // console.log("chạy vào ");
              // console.log("Refreshing token...");
              const data = await refreshToken(); // Gọi hàm refresh token
              processQueue(null, data.access_token);
              localStorage.setItem("access_token", data.access_token); // Lưu access token mới vào localStorage
              config.headers["Authorization"] = `Bearer ${data.access_token}`; // Cập nhật header Authorization
              isRefreshing = false;
            } catch (error) {
              processQueue(error, null);
              console.error("Error refreshing token:", error);
              throw error;
            } finally {
              isRefreshing = false;
            }
          } else {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                config.headers["Authorization"] = `Bearer ${token}`;
                return config;
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }
        } else {
          // console.log("còn hạn");

          config.headers["Authorization"] = `Bearer ${storageData}`; // Sử dụng token hiện tại nếu chưa hết hạn
        }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const handleGetDetailUser = async (id, token) => {
    try {
      const res = await getdetailUser(id, token);
      dispatch(updateUser({ ...res?.user, access_token: token }));
    } catch (error) {
      return error;
    }
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutWebSite />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route path="/blog" element={<BlogPage />} />{" "}
          <Route path="/order" element={<OrderPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile-user" element={<ProfilePage />} />
          <Route path="/product-detail/:id" element={<ProductDetai />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="product" element={<ProductList />} />
          <Route path="product-add" element={<ProductAdd />} />
          <Route path="product/:id/edit" element={<ProductUpdate />} />
          <Route path="user" element={<UserList />} />
          <Route path="user-add" element={<UserAdd />} />
          <Route path="user/:id/edit" element={<UserUpdate />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
