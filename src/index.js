import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { WishlistProvider } from "./Context/WishlistContext";
import { CartProvider } from "./Context/CartContext";
import { CountProvider } from "./Context/CountContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchProvider } from "./Context/SearchContext";
import { CategoryProvider } from "./Context/CategoryContext";
import { PriceProvider } from "./Context/PriceContext";
import { SortProvider } from "./Context/SortContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>

    <CartProvider>

      <WishlistProvider>

        <CountProvider>

           <SearchProvider>
              <CategoryProvider>
                <PriceProvider>
                  <SortProvider>

          <App />

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss
            theme="colored"
          />
                  </SortProvider>
                </PriceProvider>
              </CategoryProvider>
            </SearchProvider>
        </CountProvider>

      </WishlistProvider>

    </CartProvider>

  </React.StrictMode>
);

reportWebVitals();