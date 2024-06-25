import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaHandSparkles } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/slides/userSlider";
import { updateUserSV } from "../../../services/UserServices";
import { success } from "../../../components/Message/message";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../utils";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    avatar: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
        avatar: user?.avatar || "",
      });
      setAvatar(user.avatar || "");
    }
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    // console.log("file", file);
    setAvatar(file.preview);
    setFormData({ ...formData, avatar: file.preview });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onSubmit = async () => {
    const updatedData = {
      ...user, // Giá trị cũ từ user
      ...formData, // Giá trị mới từ formData
      _id: user.id,
    };
    // console.log("updatedData", updatedData);
    const res = await updateUserSV(updatedData);
    dispatch(updateUser(updatedData));
    success("Update User Success!");
  };
  return (
    <div className="max-w-[1200px] my-3 mx-auto ">
      <div>
        <h2 className="text-2xl text-black-500 font-sans">My Profile</h2>
      </div>
      <div className="flex my-6">
        {/* Profile left */}
        <div className="w-[20%] bg-slate-50 shadow-lg mr-3 dark:text-white dark:bg-black">
          <div className="flex p-3">
            {avatar && (
              <img
                className="w-[50px] h-[50px] rounded-full"
                src={avatar}
                alt="avatar"
              />
            )}
            <div className="ml-2 pt-1">
              <p className="text-sm">
                Hello <FaHandSparkles className="inline text-lg" />
              </p>
              <h4 className="font-bold ">{user.name}</h4>
            </div>
          </div>
          <hr className="my-2" />
          <div className="mb-7">
            <div className="hover:text-white hover:bg-black pl-4 py-3 ">
              <i className="fa-regular fa-user"></i>
              <span className="ml-5">Personal Information</span>
            </div>
            <div className="hover:text-white hover:bg-black pl-4 py-3 ">
              <i className="fa-solid fa-border-all"></i>
              <span className="ml-5">My Orders</span>
            </div>
            <div className="hover:text-white hover:bg-black pl-4 py-3 ">
              <i className="fa-regular fa-heart"></i>
              <span className="ml-5">My Wishlists</span>
            </div>
            <div className="hover:text-white hover:bg-black pl-4 py-3 ">
              <i className="fa-solid fa-location-dot"></i>
              <span className="ml-5">Mannage Addresses</span>
            </div>
            <div className="hover:text-white hover:bg-black pl-4 py-3 ">
              <i className="fa-solid fa-wallet"></i>
              <span className="ml-5">Saved Cards</span>
            </div>
            <div className="hover:text-white hover:bg-black pl-4 py-3 ">
              <i className="fa-regular fa-bell"></i>
              <span className="ml-5">Notifications</span>
            </div>
            <div className="hover:text-white hover:bg-black pl-4 py-3 ">
              <i className="fa-solid fa-gear"></i>
              <span className="ml-5">Settings</span>
            </div>
          </div>
        </div>
        {/* Profile right */}
        <div className="w-[80%] ml-14">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5 mb-7">
              <div>
                {avatar && (
                  <img
                    className="w-[80px] h-[80px] rounded-full mb-3"
                    src={avatar}
                    alt="avatar"
                  />
                )}
                <Upload onChange={handleChangeAvatar} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </div>
              <div className="">
                {/* <button className="text-white bg-black w-[120px] h-[40px] ml-[300px] mt-[13px] rounded-lg">
                <i class="fa-solid fa-pen-to-square"></i>Edit profile
              </button> */}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="">Name</label> <br />
                <input
                  className="dark:text-black border border-black w-full rounded-lg h-10 mt-1  pl-2"
                  type="text"
                  {...register("name")}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor=""></label> <br />
                <input
                  className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                  type="text"
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
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="">Email Address</label> <br />
                <input
                  className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                  type="text"
                  {...register("email")}
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.address}
                  onChange={handleChange}
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
    </div>
  );
};

export default ProfilePage;
