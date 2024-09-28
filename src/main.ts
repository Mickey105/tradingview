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
// Import Menubar from PrimeVue
import PrimeVue from "primevue/config";
// import Lara from "@primevue/themes/lara"; // Correct PrimeVue Lara theme for dark mode
// // Import your custom theme
import "~/assets/arya-orange/theme.css";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import ToggleButton from "primevue/togglebutton";
import Menu from "primevue/menu";
import Card from "primevue/card";
// import {
//   layoutConfig,
//   useLayout,
// } from "./components/layout/composables/layout.js";
import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";

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
// app.use(PrimeVue, {
//   theme: layoutConfig.darkTheme ? "arya-orange" : "sage-orange", // Update theme dynamically based on state
// });
// const layout = useLayout(); // Import the layout logic

// const executeDarkModeToggle = () => {
//   layout.toggleDarkMode(); // Call the toggle method from layoutConfig

//   console.log("After Class List:", document.documentElement.classList);
// };
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{yellow.50}",
      100: "{yellow.100}",
      200: "{yellow.200}",
      300: "{yellow.300}",
      400: "{yellow.400}",
      500: "{yellow.500}",
      600: "{yellow.600}",
      700: "{yellow.700}",
      800: "{yellow.800}",
      900: "{yellow.900}",
      950: "{yellow.950}",
    },
  },
});

document.documentElement.classList.add("my-app-dark");

app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    // preset: Aura,
    preset: MyPreset,
    options: {
      // darkModeSelector: "system",
      darkModeSelector: ".my-app-dark",
    },
  },
});

// Initialize theme
// executeDarkModeToggle();
// document.documentElement.classList.add("app-dark");

app.component("PrimeButton", Button);
app.component("ToggleButton", ToggleButton);
app.component("PrimeMenu", Menu);
app.component("PrimeCard", Card);

// Register the Menubar component
app.component("PrimeMenubar", Menubar);

// eslint-disable-next-line vue/multi-word-component-names
app.component("BaseComponent", Base);
app.mount("#app");
