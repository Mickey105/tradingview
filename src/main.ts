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
import "primeflex/primeflex.css";
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
import MyPreset from "./assets/css/MyPresey";
import Ripple from "primevue/ripple";
import Divider from "primevue/divider";
import CascadeSelect from "primevue/cascadeselect";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import StepPanels from "primevue/steppanels";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";

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

// Immediately check and apply dark mode class before page starts rendering
const darkMode = localStorage.getItem("darkMode");
// Default to dark mode if no preference is set
if (!darkMode || darkMode === "enabled") {
  document.documentElement.classList.add("my-app-dark");
  localStorage.setItem("darkMode", "enabled"); // Set default as enabled in localStorage
} else {
  document.documentElement.classList.remove("my-app-dark");
}

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

app.component("PrimeButton", Button);
app.component("ToggleButton", ToggleButton);
app.component("PrimeMenu", Menu);
app.component("PrimeCard", Card);
app.component("PrimeDivider", Divider);
app.directive("ripple", Ripple);
app.component("CascadeSelect", CascadeSelect);
app.component("PrimeMenubar", Menubar);
app.component("InputGroup", InputGroup);
app.component("InputGroupAddon", InputGroupAddon);
app.component("BaseComponent", Base);
app.component("PrimeStepper", Stepper);
app.component("StepList", StepList);
app.component("StepPanels", StepPanels);
app.component("StepItem", StepItem);
app.component("PrimeStep", Step);
app.component("StepPanel", StepPanel);

app.mount("#app");
