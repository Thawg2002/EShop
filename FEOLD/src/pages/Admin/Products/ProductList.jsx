import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { success } from "../../../components/Message/message";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import TableComponent from "../../../components/TableComponent/TableComponent";
import {
  deleteProduct,
  getAllProduct,
} from "../../../services/ProductServices";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
const ProductList = () => {
  const user = useSelector((state) => state.user);
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const getAllProducts = async () => {
    const res = await getAllProduct(0, 100);
    return res;
  };

  const {
    data: products,
    isFetching,
    isLoading,
    refetch,
    error,
    isError,
  } = useQuery({
    queryKey: ["Product"],
    queryFn: getAllProducts,
  });
  if (isLoading) {
    return <div>loading...</div>; // loading data
  }
  if (isError) {
    return <div>{error.message}</div>; // error data
  }

  const onhandleDeleteProduct = async () => {
    try {
      const res = await deleteProduct(rowSelected, user?.access_token);
      if (res.status == "OK") {
        success(res.message);
        setIsModalOpen(false);
        // Call refetch to get updated product list after deletion
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          className="text-lg mx-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        {rowSelected !== "" ? (
          <Link to={`/admin/product/${rowSelected}/edit`}>
            <EditOutlined className="text-lg mx-2 cursor-pointer" />
          </Link>
        ) : (
          <EditOutlined
            className="text-lg mx-2 cursor-pointer"
            onClick={onhandlgetDetailProduct}
          />
        )}
      </div>
    );
  };
  const onhandlgetDetailProduct = () => {
    console.log("rowSelected", rowSelected);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const renderImage = (image) => {
    return (
      <div>
        <img src={image} alt="" style={{ width: "50px", height: "50px" }} />
      </div>
    );
  };

  //Seach sản phẩm
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
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
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: "#ffc069",
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  //Data
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "image",
      dataIndex: "image",
      render: renderImage,
    },

    {
      title: "categories",
      dataIndex: "categories",
      ...getColumnSearchProps("categories"),
    },
    {
      title: "countInStock",
      dataIndex: "countInStock",
      sorter: (a, b) => a.countInStock - b.countInStock,
    },
    {
      title: "price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">=50",
          value: ">=",
        },
        {
          text: "<=50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },
    {
      title: "rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "<= 3",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.rating >= 3;
        }
        return record.rating <= 3;
      },
    },
    {
      title: "description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      ...getColumnSearchProps("description"),
    },
    {
      title: "discount",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "selled",
      dataIndex: "selled",
      sorter: (a, b) => a.selled - b.selled,
    },
    {
      title: "gallery",
      dataIndex: "gallery",
    },
    {
      title: "action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data.length &&
    products.data.map((product) => {
      return { ...product, key: product._id };
    });

  return (
    <div>
      <div className="mt-5 ">
        <h2 className="text-[18px]">Quản lý Products</h2>
        <button className="bg-sky-600 text-white px-3 py-2 rounded-lg mt-3">
          <Link to={"/admin/product-add"}>
            Thêm sản phẩm <PlusOutlined />
          </Link>
        </button>
      </div>
      <div>
        {/* BANG SAN PHAM */}
        <TableComponent
          columns={columns}
          products={dataTable}
          isLoading={isLoading}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                // console.log(record);
                setRowSelected(record._id);
              }, // click row
            };
          }}
        />
        <ModalComponent
          title="Xóa sản phẩm"
          open={isModalOpen}
          onCancel={handleCancelDelete}
          onOk={onhandleDeleteProduct}
        >
          <div>Bạn có chắc chắn muốn xóa sản phẩm này không?</div>
        </ModalComponent>
      </div>
    </div>
  );
};

export default ProductList;
