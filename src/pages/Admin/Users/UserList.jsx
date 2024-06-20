import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/TableComponent/TableComponent";
import { Link } from "react-router-dom";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import { deleteUser, getAllUserSV } from "../../../services/UserServices";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { success } from "../../../components/Message/message";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const UserList = () => {
  const user = useSelector((state) => state.user);
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const getAllUser = async () => {
    const res = await getAllUserSV();
    return res;
  };
  const { data, isFetching, isLoading, refetch, error, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUser,
  });
  if (isLoading) {
    return <div>loading...</div>; // loading data
  }
  if (isError) {
    return <div>{error.message}</div>; // error data
  }

  const onhandleDeleteUser = async () => {
    try {
      const res = await deleteUser(rowSelected, user?.access_token);
      if ((res.status = "OK")) {
        success(res.message);
        setIsModalOpen(false);
        // Call refetch to get updated product list after deletion
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onhandlgetDetailUser = () => {
    console.log("rowSelected", rowSelected);
  };
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          className="text-lg mx-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        {rowSelected !== "" ? (
          <Link to={`/admin/user/${rowSelected}/edit`}>
            <EditOutlined className="text-lg mx-2 cursor-pointer" />
          </Link>
        ) : (
          <EditOutlined
            className="text-lg mx-2 cursor-pointer"
            onClick={onhandlgetDetailUser}
          />
        )}
      </div>
    );
  };

  const renderImage = (image) => {
    return (
      <div>
        <img src={image} alt="" style={{ width: "50px", height: "50px" }} />
      </div>
    );
  };
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  //Seach user
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
      title: "avatar",
      dataIndex: "avatar",
      render: renderImage,
    },

    {
      title: "isAdmin",
      dataIndex: "isAdmin",
      render: (isAdmin) => (isAdmin ? "Admin" : "User"),
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "address",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    data?.user.length &&
    data.user.map((product) => {
      return { ...product, key: product._id };
    });

  return (
    <div>
      <div className="mt-5 ">
        <h2 className="text-[18px]">Quản lý User</h2>
        <button className="bg-sky-600 text-white px-3 py-2 rounded-lg mt-3">
          {/* <Link to={"/admin/user-add"}>
            Thêm người dùng <PlusOutlined />
          </Link> */}
        </button>
      </div>
      <div>
        {/* BANG User */}
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
          title="Xóa User"
          open={isModalOpen}
          onCancel={handleCancelDelete}
          onOk={onhandleDeleteUser}
        >
          <div>Bạn có chắc chắn muốn xóa user này không?</div>
        </ModalComponent>
      </div>
    </div>
  );
};

export default UserList;
