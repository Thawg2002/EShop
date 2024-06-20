import React from "react";

const NavBar2 = () => {
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((item, index) => {
          return <li key={index}>{item}</li>;
        });
      default:
        return {};
    }
  };
  return (
    <div className="p-2" data-aos="fade-up">
      <div className="">
        <div>
          <div>
            <h4 className="font-medium text-xl ">Danh mục sản phẩm</h4>
          </div>
          <ul className="leading-7 pl-2 cursor-pointer">
            {renderContent("text", ["Tai nghe", "Máy tính", "Bàn phím"])}
          </ul>
        </div>
        {/*  Dịch vụ*/}
        <div className="space-y-6">
          <div>
            <h5 className="my-2 font-medium text-[16px]">Dịch vụ</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Default checkbox
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar2;
