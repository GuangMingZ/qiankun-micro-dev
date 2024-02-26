import React from "react";
import react from "./assets/react.png";
import s from "./app.module.scss";

function App() {
  return (
    <div
      className={s.app}
      style={{
        marginTop: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={react} alt="" className={s.img} />
      <div className="hello">
        <h1>Hello React App 本地联调模式</h1>
      </div>
    </div>
  );
}

export default App;
