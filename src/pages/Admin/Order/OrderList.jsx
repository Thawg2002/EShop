import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Input, Space } from "antd";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import TableComponent from "../../../components/TableComponent/TableComponent";
import { getAllOrders } from "../../../services/orderServices";
import { orderContant } from "../../../contant";
import PieChartComponent from "./PieChartComponent";
import { convertPrice } from "../../../utils";
const OrderList = () => {
  const user = useSelector((state) => state.user);
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const getAllOrder = async () => {
    const res = await getAllOrders(user?.access_token);
    return res;
  };
  const { data, isFetching, isLoading, refetch, error, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrder,
  });
  if (isLoading) {
    return <div>loading...</div>; // loading data
  }
  if (isError) {
    return <div>{error.message}</div>; // error data
  }
  //   console.log("data", data);
  const renderImage = (image) => {
    return (
      <div>
        <img src={image} alt="" style={{ width: "50px", height: "50px" }} />
      </div>
    );
  };

  // Function to handle search
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Function to reset search
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  //Data
  const columns = [
    {
      title: "userName",
      dataIndex: "userName",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("userName"),
    },

    {
      title: "phone",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "address",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "nameProduct",
      dataIndex: "product",
      ...getColumnSearchProps("product"),
    },
    {
      title: "imageProduct",
      dataIndex: "image",
      render: renderImage,
    },
    {
      title: "amountProduct",
      dataIndex: "amount",
      ...getColumnSearchProps("amount"),
    },
    {
      title: "paymentMethod",
      dataIndex: "paymentMethod",
      ...getColumnSearchProps("paymentMethod"),
    },
    {
      title: "isPaid",
      dataIndex: "isPaid",
      ...getColumnSearchProps("isPaid"),
    },
    {
      title: "shipper",
      dataIndex: "isDelivered",
      ...getColumnSearchProps("isDelivered"),
    },
    {
      title: "totalPrice",
      dataIndex: "totalPrice",
      ...getColumnSearchProps("totalPrice"),
    },
  ];
  const dataTable =
    data?.data.length &&
    data.data.map((order) => {
      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        product: order?.orderItems.map((item) => item.name).join(", "),
        image: order?.orderItems.map((item) => item.image).join(", "),
        amount: order?.orderItems.map((item) => item.amount).join(", "),
        paymentMethod: orderContant.payment[order?.paymentMethod],
        isPaid: order?.isPaid ? "TRUE" : "FALSE",
        isDelivered: order?.isDelivered ? "TRUE" : "FALSE",
        totalPrice: convertPrice(order?.totalPrice),
      };
    });

  return (
    <div>
      <div className="w-[500px] h-[200px]">
        <PieChartComponent data={data?.data} />
      </div>
      <div className="mt-5 ">
        <h2 className="text-[18px]">Quản lý Order</h2>
        <button className="bg-sky-600 text-white px-3 py-2 rounded-lg mt-3"></button>
      </div>
      <div>
        {/* BANG User */}
        <TableComponent
          columns={columns}
          products={dataTable}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default OrderList;
