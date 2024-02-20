/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "@arco-design/web-react";
import type { MenuProps } from "@arco-design/web-react/es/Menu/interface";
import { IconHome, IconCalendar } from "@arco-design/web-react/icon";
import { set } from "lodash";
import MicroDevMode from './components/micro-dev-mode';
import ReactApp from "./pages/react-app";
import VueApp from "./pages/vue-app";
import "./App.css";

const MenuItem = Menu.Item;
const Sider = Layout.Sider;
const Content = Layout.Content;

function BaseMenu(props: any) {
  return (
    <Menu defaultSelectedKeys={["1"]} {...props}>
      <Link to="/react-app">
        <MenuItem key="1">
          <IconHome />
          React App
        </MenuItem>
      </Link>
      <Link to="/vue-app">
        <MenuItem key="2">
          <IconCalendar />
          Vue App
        </MenuItem>
      </Link>
    </Menu>
  );
}

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const menuProps: MenuProps = {};
  if (location.pathname.includes("vue-app")) {
    set(menuProps, "defaultSelectedKeys", ["2"]);
  }

  const collapseHandler = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className="layout-collapse-demo">
      <Sider
        theme="dark"
        breakpoint="lg"
        onCollapse={collapseHandler}
        collapsed={collapsed}
        width={220}
        collapsible
      >
        <div className="logo" />
        <BaseMenu theme="dark" style={{ width: "100%" }} {...menuProps} />
      </Sider>
      <Layout>
        <Layout style={{ padding: "0 24px" }}>
          <Content>
            <Routes>
              <Route path="/react-app" element={<ReactApp />} />
              <Route path="/vue-app" element={<VueApp />} />
              <Route path="*" element={<Navigate to="/react-app" replace />} />
            </Routes>
            <MicroDevMode />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
