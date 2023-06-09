import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./redux/store.ts";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
);
