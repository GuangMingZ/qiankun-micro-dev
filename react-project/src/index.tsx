import React from "react";
import ReactDOM from "react-dom/client";
import './public-path';
import "./index.css";
import App from "./App";

let root: any;

function render(props: any) {
  const { container } = props;
  const defaultContainer = document.getElementById(
    "react-root"
  ) as HTMLElement;
  root = ReactDOM.createRoot(container ?? defaultContainer);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props: any) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props: any) {
  const { container } = props;
  if (!root) {
    const defaultContainer = document.getElementById(
      "react-root"
    ) as HTMLElement;
    ReactDOM.createRoot(container ?? defaultContainer);
  }
  root.unmount()
}

if (process.env.NODE_ENV === 'development') {
  (window as any).qiankunLifecycle = {
    bootstrap,
    mount,
    unmount,
  };
}