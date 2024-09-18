import { createApp } from "vue";
import App from "~/App.vue";

// @ts-ignore
import Base from "~/components/layout/Base.vue";
// @ts-ignore
import { initRouter } from "~/router";
// @ts-ignore
import store from "~/store";
// @ts-ignore
import themes from "~/mixins/themes";
import "~/assets/css/tailwind.css";
import "~/assets/css/main.css";
import "~/assets/css/theme.scss";
import "~/assets/css/modules/_index.scss";
import "vue3-tel-input/dist/vue3-tel-input.css";
// @ts-ignore
import initPlugins from "~/plugins/index";

// @ts-ignore
import { useNotifications } from "~/components/notifications/index";
// @ts-ignore
import useModals from "~/components/modal/modal";
//Google login
import Vue3GoogleLogin from "vue3-google-login";

export const app = createApp(App);

app.use(initRouter);
app.use(store);
app.use(initPlugins);
app.mixin(themes);
app.config.globalProperties.$store = store;
app.config.globalProperties.$notify = (n: any) => {
  useNotifications.show({ type: n.type, title: n.title, description: n.text });
};
app.config.globalProperties.$modal = {
  show: (a: any, b: any, c: any, d: any) => {
    useModals.show({
      a,
      b,
      c,
      d,
    });
  },
  close: () => {
    useModals.close();
  },
};
app.use(Vue3GoogleLogin, {
  clientId:
    "945663563720-o7vik62t724s2mmedlgee1j3g79n887b.apps.googleusercontent.com",
});

// eslint-disable-next-line vue/multi-word-component-names
app.component("BaseComponent", Base);
app.mount("#app");
