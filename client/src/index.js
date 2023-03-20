import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { UserContextProvider } from "./context/UserContext";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// redux Store
const store = configureStore({
  reducer: reducers,
  middleware: [thunkMiddleware],
  enhancers: [composeWithDevTools],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserContextProvider>
  </React.StrictMode>
);
