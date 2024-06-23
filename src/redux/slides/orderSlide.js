import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlider = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state.orderItems.find(
        (item) => item.product === orderItem.product
      );
      if (itemOrder) {
        itemOrder.amount += orderItem.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },
    removeOrder: (state, action) => {
      if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
        const idProduct = action.payload;
        const itemOrder = state.orderItems.filter(
          (item) => item.product !== idProduct
        );
        state.orderItems = itemOrder;
      }
    },
    removeAllOrder: (state, action) => {
      if (confirm("Bạn có chắc muốn xóa tất cả sản phẩm này không?")) {
        const listchecked = action.payload;
        console.log("listchecked", listchecked);
        const itemOrder = state.orderItems.filter(
          (item) => !listchecked.includes(item.product)
        );
        state.orderItems = itemOrder;
      }
    },
    increaseAmount: (state, action) => {
      const idProduct = action.payload;
      console.log("action.payload", action.payload);

      const itemOrder = state.orderItems.find(
        (item) => item.product === idProduct
      );
      console.log("itemOrder", itemOrder);
      itemOrder.amount++;
    },
    decreaseAmount: (state, action) => {
      const idProduct = action.payload;
      const itemOrder = state.orderItems.find(
        (item) => item.product === idProduct
      );
      itemOrder.amount--;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addOrderProduct,
  removeOrder,
  increaseAmount,
  decreaseAmount,
  removeAllOrder,
} = orderSlider.actions;

export default orderSlider.reducer;
