import React, { useState } from "react";
import { useForm } from "react-hook-form";

const UserAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    avatar: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {};
  return (
    <div>
      <div className="w-[1200px] mt-[50px]">
        <h2 className="text-xl font-bold my-5">Thêm người dùng </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="">Name</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1  pl-2"
                type="text"
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="">email</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("email")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-7">
            <div>
              <label htmlFor="">Phone Number</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("phone")}
              />
            </div>
            <div>
              <label htmlFor="">Email Address</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("email")}
              />
            </div>
          </div>
          <div className=" mt-7">
            <div>
              <label htmlFor="">Address</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("address")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mb-7">
            <div></div>
            <div className="">
              <button className="hover:text-white hover:bg-black w-[120px] h-[40px] ml-[300px] mt-[13px] rounded-lg border border-black">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAdd;
