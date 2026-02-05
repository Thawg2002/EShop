import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getdetailUser, updateUserSV } from "../../../services/UserServices";
import { useSelector } from "react-redux";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../utils";
import { error, success } from "../../../components/Message/message";

const UserUpdate = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //Xử lý hình ảnh
  const handleChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  //Lấy dữ liệu productdetail
  useEffect(() => {
    (async () => {
      const res = await getdetailUser(id, user?.access_token);
      reset(res.user);
      setAvatar(res.user.avatar);
    })();
  }, [id]);

  // //Thực hiện call api
  const mutation = useMutation({
    mutationFn: async ({ data }) => {
      // console.log("data", data);
      // console.log("token", token);
      const res = await updateUserSV(data);
      // console.log(res);
      return res;
    },
    onSuccess: (data) => {
      if (data.status === "OK") {
        success(data.message);
        navigate("/admin/user");
      } else if (data.status === "ERR") {
        error(data.message);
      }
    },
    onError: (error) => {
      error("Đăng nhập thất bại");
    },
  });
  // console.log(mutation);
  const onSubmit = async (data) => {
    // console.log("data", data);
    const datanew = { ...data, avatar: avatar || data.avatar };
    mutation.mutate({ data: datanew });
  };

  return (
    <div>
      <div className="w-[1200px] mt-[50px]">
        <h2 className="text-xl font-bold my-5">Cập nhật người dùng</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3 w-[400px]">
            <label htmlFor="">Anh User</label>
            <br />
            {avatar && (
              <img
                className="w-[80px] h-[80px] rounded-full mb-3"
                src={avatar}
                {...register("avatar")}
                alt="avatar"
              />
            )}
            <Upload onChange={handleChangeImage} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
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
              <label htmlFor="">Phân Quyền</label> <br />
              <select name="" id="" {...register("isAdmin")}>
                <option value="true">Admin</option>
                <option value="false">User</option>
              </select>
            </div>
            <div>
              <label htmlFor="">phone</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("phone")}
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

export default UserUpdate;
