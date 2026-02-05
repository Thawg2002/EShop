import { Button, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../utils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../../../services/ProductServices";
import { success, error } from "../../../components/Message/message";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState("");

  const handleChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setImage(file.preview);
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await addProduct(data);
      return res;
    },
    onSuccess: (data) => {
      // console.log(data);
      if (data.status === "OK") {
        success("Thêm sản phẩm thành công");
        navigate("/admin/product");
      } else if (data.status === "ERR") {
        error(data.message);
      }
    },
    onError: (error) => {
      error("Đăng nhập thất bại");
    },
  });

  const onSubmit = async (data) => {
    const datanew = { ...data, image };
    // console.log("datanew", datanew);
    mutation.mutate(datanew);
  };
  return (
    <div>
      <div className="w-[1200px] mt-[50px]">
        <h2 className="text-xl font-bold my-5">Thêm sản phẩm</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3 w-[400px]">
            <label htmlFor="">Anh chính sản phẩm</label>
            <br />
            {image && (
              <img
                className="w-[80px] h-[80px] rounded-full mb-3"
                src={image}
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

export default ProductAdd;
