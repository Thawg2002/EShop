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
// export const convertPrice = (price) => {
//   try {
//     const result = price?.toLocaleString().replaceAll(",", ".");
//     return `${result} VND`;
//   } catch (error) {
//     return null;
//   }
// };
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
