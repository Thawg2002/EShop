import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide";
import userReducer from "./slides/userSlider";
import orderReducer from "./slides/orderSlide";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    order: orderReducer,
  },
});
