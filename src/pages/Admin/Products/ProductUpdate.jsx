import { Button, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../utils";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../../../services/ProductServices";

import {
  addProduct,
  getDetailProduct,
} from "../../../services/ProductServices";
import { success, error } from "../../../components/Message/message";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductUpdate = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
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
    setImage(file.preview);
  };

  //Lấy dữ liệu productdetail
  useEffect(() => {
    (async () => {
      const res = await getDetailProduct(id);
      // console.log(res);
      reset(res.data);
      setImage(res.data.image);
    })();
  }, [id]);

  //Thực hiện call api
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      // console.log("data", data);
      // console.log("token", token);
      const res = await updateProduct(data, token);
      // console.log(res);
      return res;
    },
    onSuccess: (data) => {
      // console.log(data);
      if (data.status === "OK") {
        success("Cập nhật sản phẩm thành công");
        navigate("/admin/product");
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
    const datanew = { ...data, image: image || data.image };
    mutation.mutate({ data: datanew, token: user?.access_token });
  };
  return (
    <div>
      <div className="w-[1200px] mt-[50px]">
        <h2 className="text-xl font-bold my-5">Cập nhật sản phẩm </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3 w-[400px]">
            <label htmlFor="">Anh chính sản phẩm</label>
            <br />
            {image && (
              <img
                className="w-[80px] h-[80px] rounded-full mb-3"
                src={image}
                // {...register("image")}
                alt="image"
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
              <label htmlFor="">Danh mục</label> <br />
              {/* <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("categories")}
              /> */}
              <select name="" id="" {...register("categories")}>
                <option value="laptop">Laptop</option>
                <option value="tainghe">Tai Nghe</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-7">
            <div>
              <label htmlFor="">countInStock</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("countInStock")}
              />
            </div>
            <div>
              <label htmlFor="">price</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("price")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-7">
            <div>
              <label htmlFor="">rating</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("rating")}
              />
            </div>
            <div>
              <label htmlFor="">description</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("description")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-7">
            <div>
              <label htmlFor="">discount</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("discount")}
              />
            </div>
            <div>
              <label htmlFor="">selled</label> <br />
              <input
                className="dark:text-black border border-black w-full rounded-lg h-10 mt-1 pl-2"
                type="text"
                {...register("selled")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mb-7">
            <div></div>
            <div>
              <button
                className=" right-0 hover:text-white hover:bg-black w-[180px] h-[50px] ml-[300px] mt-[13px] rounded-lg border border-black"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? <Spin /> : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdate;
