import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@arco-design/web-react/dist/css/arco.css";
import 'tdesign-react/es/style/index.css';
import { registerMicroApps, start } from "qiankun";
import microAppConfig from "./micro-app";
import { MICRO_FRONTEND_ROOT_READY } from "./components/micro-app-div";
import App from "./App.tsx";
import "./index.css";

// 注册微应用
registerMicroApps(microAppConfig);

// 启动微应用
const startMicro = () => {
  start({
    sandbox: {
      experimentalStyleIsolation: true,
    },
    singular: true,
    prefetch: false,
  });
};

document.addEventListener(MICRO_FRONTEND_ROOT_READY, startMicro, {
  once: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
