import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toaster position="bottom-center" />
  </Provider>
);
