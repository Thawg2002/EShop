import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </React.StrictMode> */}
    </BrowserRouter>{" "}
  </QueryClientProvider>
);
