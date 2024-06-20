import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/loading";
import axios from "axios";
import { error, success } from "../../../components/Message/message";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { getdetailUser, loginUser } from "../../../services/UserServices";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slides/userSlider";
import { refresh } from "aos";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (user) => {
      // const res = await axios.post("http://localhost:8080/api/signin", user);
      // return res.data;
      const res = await loginUser(user);
      return res;
    },
    onSuccess: (data) => {
      if (data.status == "ERR") {
        error("Đăng nhập thất bại");
      } else {
        success("Đăng nhập thành công");
        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );
        if (data?.access_token) {
          const decoded = jwtDecode(data?.access_token);
          if (decoded?.id) {
            handleGetDetailUser(decoded?.id, data?.access_token);
          }
        }
        navigate("/");
      }
    },
    onError: (error) => {
      error("Đăng nhập thất bại");
    },
  });

  const { data } = mutation;
  const onSubmit = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setTimeout(() => {
      mutation.mutate(data);
    }, 2000);
  };

  const handleGetDetailUser = async (id, token) => {
    try {
      const res = await getdetailUser(id, token);
      dispatch(updateUser({ ...res?.user, access_token: token }));
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container">
      <section className=" dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="my-[13px]">
                {data?.status === "ERR" && (
                  <span className="text-sm text-red-600">{data?.message}</span>
                )}
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    {...register("email")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    {...register("password")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark: dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <Loading isLoading={isLoading}>
                  <button
                    type="submit"
                    className="w-full text-red-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                </Loading>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signin;
