import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

let instance = null;
function render(props = {}) {
  const { container } = props;

  instance = new Vue({
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#vue-app") : "#vue-app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}
export async function mount(props) {
  console.log("[vue] props from main framework", props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}

if (process.env.NODE_ENV === 'development') {
  (window).qiankunLifecycle = {
    bootstrap,
    mount,
    unmount,
  };
}
