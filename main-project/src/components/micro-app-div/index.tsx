import React, { useRef, useEffect } from "react";
import { Spin } from "@arco-design/web-react";
import s from "./index.module.scss";

// 子应用挂载点mount事件
export const MICRO_FRONTEND_ROOT_READY = "micro-frontend-root-ready";

export default function MicroAppDiv(): React.ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const event = new Event(MICRO_FRONTEND_ROOT_READY);
    document.dispatchEvent(event);
  }, []);

  return (
    <div
      id="micro-frontend-root"
      className="micro-frontend-container"
      ref={rootRef}
    >
      <div className={s["micro-app-loading"]}>
        <Spin tip="加载中..." dot loading size={10} />
      </div>
    </div>
  );
}
