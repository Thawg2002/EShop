import React, { useState } from "react";
import CryptoJS from "crypto-js";

const MomoPayment = () => {
  const [amount, setAmount] = useState("");
  const [orderInfo, setOrderInfo] = useState("");
  const [orderId, setOrderId] = useState("");
  const [redirectUrl, setRedirectUrl] = useState(
    "https://webhook.site/your-redirect-url"
  );
  const [ipnUrl, setIpnUrl] = useState("https://webhook.site/your-ipn-url");

  const accessKey = "F8BBA842ECF85";
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const partnerCode = "MOMO";
  const requestType = "payWithMethod";
  const lang = "vi";
  const extraData = "";

  const handlePayment = () => {
    const orderId = partnerCode + new Date().getTime(); // Tạo orderId
    setOrderId(orderId);

    // Tạo chuỗi rawSignature cần thiết để ký HMAC SHA256
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${orderId}&requestType=${requestType}`;

    // Tạo chữ ký HMAC SHA256
    const signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(
      CryptoJS.enc.Base64
    );

    const requestBody = JSON.stringify({
      partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: orderId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      extraData,
      signature,
    });

    // Gửi yêu cầu đến MoMo API
    fetch("https://test-payment.momo.vn/v2/gateway/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Payment response:", data);
        // Chuyển hướng người dùng đến trang thanh toán MoMo
        if (data && data.payUrl) {
          window.location.href = data.payUrl;
        }
      })
      .catch((error) => {
        console.error("Error during payment process:", error);
      });
  };

  return (
    <div>
      <h2>Thanh toán Momo</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Nhập số tiền"
      />
      <input
        type="text"
        value={orderInfo}
        onChange={(e) => setOrderInfo(e.target.value)}
        placeholder="Thông tin đơn hàng"
      />
      <button onClick={handlePayment}>Thanh toán với MoMo</button>
    </div>
  );
};

export default MomoPayment;
