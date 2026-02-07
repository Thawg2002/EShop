import React from "react";
import {
  FaHeadphonesAlt,
  FaCarSide,
  FaWallet,
  FaCheckCircle,
} from "react-icons/fa";

const ServiceData = [
  {
    id: 1,
    icon: <FaCarSide className="text-4xl md:text-5xl text-primary" />,
    title: "Free Shipping",
    description: "Free Shipping On All Orrder",
  },
  {
    id: 2,
    icon: <FaCheckCircle className="text-4xl md:text-5xl text-primary" />,
    title: "Sefe Money",
    description: "30 Day Money Back",
  },
  {
    id: 3,
    icon: <FaWallet className="text-4xl md:text-5xl text-primary" />,
    title: "Secure Payment",
    description: "All Payment Secure",
  },
  {
    id: 4,
    icon: <FaHeadphonesAlt className="text-4xl md:text-5xl text-primary" />,
    title: "OneLine Support 24/7",
    description: "Technical Support 24/7",
  },
];
const Services = () => {
  return (
    <div data-aos="fade-up">
      <div className="container my-14 md:my-20 ">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ServiceData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start sm:flex-row mx-1 my-1"
            >
              {item.icon}
              <div className="ml-4">
                <h1 className="lg:text-xl font-bold">{item.title}</h1>
                <h1 className="text-gray-400 text-sm">{item.description}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
