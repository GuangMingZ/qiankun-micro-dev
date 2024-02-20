/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { IMicroDevConfig, IMicroDevTableRow } from "../index.type";

const storage = window.localStorage;

const MICRO_APP_LIST = [
  { appKey: "react-app", appName: "react-app" },
  { appKey: "vue-app", appName: "vue-app" },
];

export const S_KEY = "QIANKUN_MICRO_DEV_MODE";

const convertToTableRow = (data: IMicroDevConfig): IMicroDevTableRow[] =>
  MICRO_APP_LIST.map((e) => {
    const item = data?.[e.appKey] ?? {};
    return {
      ...e,
      devAddress: item?.url,
      devSwitch: item?.devSwitch,
    };
  });

const convertToConfig = (data: IMicroDevTableRow[]): IMicroDevConfig => {
  const config: IMicroDevConfig = {};
  data.forEach((e) => {
    config[e.appKey ?? ""] = {
      devSwitch: e.devSwitch ?? false,
      url: e.devAddress ?? "",
    };
  });
  return config;
};

/**
 * 从localStorage获取dev mode配置数据
 * @returns
 */
export default function useMicroDevData(): [
  IMicroDevTableRow[],
  (res: IMicroDevTableRow[]) => void,
  (res: IMicroDevTableRow[]) => void
] {
  const [data, setData] = useState<IMicroDevTableRow[]>([]);

  useEffect(() => {
    try {
      const itemStr = storage.getItem(S_KEY) ?? "";
      let config: IMicroDevConfig = {};
      if (itemStr) {
        config = JSON.parse(itemStr);
      }
      setData(convertToTableRow(config));
    } catch (e: any) {
      console.error(e?.message);
    }
  }, []);

  const updateData = (res: IMicroDevTableRow[]) => {
    setData(res);
  };

  const saveData = (res: IMicroDevTableRow[]) => {
    try {
      setData(res);
      const config = convertToConfig(res);
      storage.setItem(S_KEY, JSON.stringify(config));
    } catch (e: any) {
      console.error(e?.message);
    }
  };

  return [data, updateData, saveData];
}
