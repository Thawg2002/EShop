import { orderContant } from "./contant";

export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const convertPrice = (price) => {
  try {
    // Làm tròn xuống số nguyên gần nhất
    const roundedPrice = Math.floor(price);
    // Định dạng số với dấu chấm làm dấu ngăn cách hàng nghìn
    const result = roundedPrice.toLocaleString().replaceAll(",", ".");
    return `${result} VND`;
  } catch (error) {
    return null;
  }
};


export const convertDataChart = (data, type) => {
  try {
    const object = {};
    Array.isArray(data) &&
      data.forEach((opt) => {
        if (!object[opt[type]]) {
          object[opt[type]] = 1;
        } else {
          object[opt[type]] += 1;
          console.log(
            "c;getBase64",
            object[opt[type]],
            typeof object[opt[type]]
          );
        }
      });
    const results =
      Array.isArray(Object.keys(object)) &&
      Object.keys(object).map((item) => {
        return {
          name: orderContant.payment[item],
          value: object[item],
        };
      });
    return results;
  } catch (e) {
    return [];
  }
};
