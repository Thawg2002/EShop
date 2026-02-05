import { useEffect } from "react";

import "aos/dist/aos.css";

import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import Blogs from "../../../components/Blogs/Blogs";
import Hero from "../../../components/Hero/Hero";
import Partners from "../../../components/Partners/Partners";
import Products from "../../../components/Products/Products";
import Category from "../../../components/Category/Category";
import Category2 from "../../../components/Category/Category2";
import Services from "../../../components/Services/Services";
import { getAllProduct } from "../../../services/ProductServices";
import headphone from "../../../assets/hero/headphone.png";
import samrtwatch2 from "../../../assets/category/smartwatch2-removebg-preview.png";
import Banner from "../../../components/Banner/Banner";
const BannerData = {
  discount: "30% OFF",
  title: "Fine Smiles",
  date: "10 Jan to 28 Jan",
  image: headphone,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita repellat alias beatae rerum quod ab harum minima blanditiis quas vel? Maxime commodi consequatur minima minus, impedit sequi ut animi rem.",
  bgColor: "#f42c37",
};
const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "14 Jan to 28 Jan",
  image: samrtwatch2,
  title2: "Smart Solo",
  title3: "Winter Sales",
  title4:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita repellat alias beatae rerum quod ab harum minima blanditiis quas vel? Maxime commodi consequatur minima minus, impedit sequi ut animi rem.",
  bgColor: "#2dcc6f",
};

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease",
      once: true,
      mirror: false,
    });
  }, []);

  const fetchProductAll = async () => {
    const res = await getAllProduct();
    return res.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Hero />
      <Category />
      <Category2 />
      <Services />
      <Banner data={BannerData} />
      <Products products={data} />
      <Banner data={BannerData2} />
      <Blogs />
      <Partners />
    </div>
  );
};

export default HomePage;
