import React from "react";
import { FaGithubAlt, FaLocationArrow } from "react-icons/fa6";
import { GiSelfLove } from "react-icons/gi";
const FooterLinks = [
  {
    title: "Home",
    links: "/#",
  },
  {
    title: "About",
    links: "/#about",
  },
  {
    title: "Contact",
    links: "/#contact",
  },
  {
    title: "Blog",
    links: "/#blog",
  },
];

const Footer = () => {
  return (
    <div className="dark:bg-gray-950">
      <div className="container  ">
        <div className="grid md:grid-cols-3 ">
          {/* company details */}
          <div className="py-8 px-4">
            {/* Logo */}
            <a
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
              href="#"
            >
              EShop
            </a>
            <p className="text-gray-600 lg:pr-24 pt-3 dark:text-white/70">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio ad at, reiciendis quibusdam beatae consectetur quasi
            </p>
            <p className="text-gray-500 mt-8 ">
              Made with <GiSelfLove className="inline text-[16px] mx-1" /> by
              the XuanThang.{" "}
            </p>
            <a
              href="https://www.facebook.com/tnthng2002/"
              className="inline-block bg-sky-500 p-2 text-white font-semibold rounded-full mt-4 "
            >
              Visit my facebook profile
            </a>
          </div>
          {/* Footer Links */}
          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
            {/* important Links */}
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3 ">
                Important Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.links}
                      className="text-gray-600 hover:text-black duration-300 dark:text-white/70 dark:hover:text-white"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* quick Links */}
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3 ">
                Quick Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.links}
                      className="text-gray-600 hover:text-black duration-300 dark:text-white/70 dark:hover:text-white"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Company address */}
            <div className="py-8 px-4 col-span-2 sm:col-auto">
              <div>
                <div className="flex">
                  <FaGithubAlt className="mr-3" />
                  <FaGithubAlt className="mr-3" />
                  <FaGithubAlt className="mr-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
