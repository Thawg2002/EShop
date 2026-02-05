import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = ({ isLoading, children }) => {
  return (
    <Spin
      spinning={isLoading}
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    >
      {children}
    </Spin>
  );
};

export default Loading;
