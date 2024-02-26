/* eslint-disable @typescript-eslint/no-explicit-any */
import { S_KEY } from "./components/micro-dev-mode";

export const MICRO_APP_CONTAINER = "#micro-frontend-root";

const defaultMicroAppConfig = [
  {
    name: "react-app", // app name registered
    entry: "//localhost:3003",
    container: "#micro-frontend-root",
    activeRule: "/react-app",
  },
  {
    name: "vue-app",
    entry: "//localhost:3002",
    container: "#micro-frontend-root",
    activeRule: "/vue-app",
  },
];

const getFinalMicroAppConfig = () => {
  const storage = window.localStorage;
  try {
    const itemStr = storage.getItem(S_KEY) ?? "";
    let config: any;
    if (itemStr) {
      config = JSON.parse(itemStr);
    }
    if (typeof config === "object") {
      return defaultMicroAppConfig.map((e) => {
        const appName = e.name ?? "";
        const devConfig = config?.[appName] ?? {};
        if (devConfig.devSwitch) {
          return {
            ...e,
            entry: devConfig.url ?? e.entry,
          };
        }
        return e;
      });
    }
    return defaultMicroAppConfig;
  } catch (e: any) {
    console.error(e?.message);
    return defaultMicroAppConfig;
  }
};

// TODO 生产环境可选直接返回defaultMicroAppConfig, 屏蔽microDev模式
const FINAL_MICRO_APP_CONFIG = getFinalMicroAppConfig();

export default FINAL_MICRO_APP_CONFIG;
