import React from "react";
import { Drawer } from "antd";
const DrawComponent = ({
  title = "Drawer",
  placement = "right",
  isOpen = flase,
  children,
  ...rest
}) => {
  return (
    <div>
      <Drawer title={title} placement={placement} open={isOpen} {...rest}>
        {children}
      </Drawer>
    </div>
  );
};

export default DrawComponent;
