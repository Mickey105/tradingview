<script setup>
import { ref, onMounted } from "vue";
import eventBus from "../../static/public/evenBus"; // Using alias for easier path resolution

const menu = ref();

const toggle = (event) => {
  menu.value.toggle(event);
};

const toggleDarkMode = () => {
  // Toggle the "my-app-dark" class on the root element
  document.documentElement.classList.toggle("my-app-dark");
  // Check if the dark mode is enabled
  const isDark = document.documentElement.classList.contains("my-app-dark");
  // Store the preference in localStorage
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  // Emit the theme toggle event via event bus for other components to listen to
  eventBus.emit("toggleTheme", isDark);
};

onMounted(() => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.documentElement.classList.add("my-app-dark");
  }
});
</script>

<script>
import LanguageSelector from "~/components/layout/parts/LanguageSelector.vue";
import { mapGetters } from "vuex";
// import { useCookies } from "vue3-cookies";
// import { ref } from "vue";
import menuHelper from "~/mixins/menuHelper";
import helpers from "~/mixins/helpers";
import handleLogout from "~/mixins/handleLogout";
import getFixedDecimal from "~/mixins/getFixedDecimal";

export default {
  name: "NavbarComponent",
  components: { LanguageSelector },
  mixins: [menuHelper, handleLogout, helpers, getFixedDecimal],
  props: {
    routeName: {
      type: String,
      default: "",
    },
  },
  setup() {
    // Method to toggle dark mode
    const toggleDarkMode = () => {
      document.documentElement.classList.toggle("my-app-dark");
      const isDark = document.documentElement.classList.contains("my-app-dark");
      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
      // setGraphColor(isDark); // Call setGraphColor with the current state of isDark
      // makeChart(); // Ensure this function is defined elsewhere
    };

    return {
      toggleDarkMode,
    };
  },

  data() {
    return {
      items: [
        // {
        //   label: "Sign Up",
        //   icon: "pi pi-pen-to-square",
        //   class: "border-round-3xl",
        //   route: "/login",
        // },
        {
          label: "Buy Crypto",
          icon: "pi pi-credit-card",
          url: "https://pool4ever.com/app-buy-page",
        },
        {
          label: "Spot",
          icon: "pi pi-chart-bar",
          items: [
            {
              label: this.$t("common.wallet"),
              icon: "pi pi-wallet",
              route: "/wallet",
            },
            {
              label: "Trade",
              icon: "pi pi-server",
              route: "/trade",
            },
            {
              label: this.$t("common.exchange"),
              icon: "pi pi-pencil",
              route: "/quick-swap",
            },
            {
              label: this.$t("common.fees"),
              icon: "pi pi-receipt",
              route: "/fees",
            },
            {
              separator: true,
            },
            // {
            //   label: "Templates",
            //   icon: "pi pi-palette",
            //   items: [
            //     {
            //       label: "Apollo",
            //       icon: "pi pi-palette",
            //       badge: 2,
            //     },
            //     {
            //       label: "Ultima",
            //       icon: "pi pi-palette",
            //       badge: 3,
            //     },
            //   ],
            // },
          ],
        },
        {
          label: "Market Rates",
          icon: "pi pi-table",
          url: "https://pool4ever.com/app-exchange",
        },
        {
          label: "Mining Pools",
          icon: "pi pi-table",
          url: "https://pool4ever.com",
        },
        {
          label: this.$t("common.support"),
          icon: "pi pi-info-circle",
          route: "/support",
        },
      ],
      userItems: [
        {
          label: this.$t("common.settings"),
          icon: "pi pi-cog",
          route: "/settings",
        },
        {
          label: this.$t("common.wallet"),
          icon: "pi pi-wallet",
          route: "/wallet",
        },
        {
          label: this.$t("common.deposit"),
          icon: "pi pi-money-bill",
          route: "/wallet/deposit/",
        },
        {
          label: this.$t("common.support"), // Another example
          icon: "pi pi-headphones",
          route: "/support",
        },
        {
          label: this.$t("common.logout"),
          icon: "pi pi-sign-out",
          command: () => {
            this.handleLogout();
          },
        },
        {
          separator: true,
        },
      ],
      hideHeaderPages: [
        "login",
        "confirm-withdrawal-request",
        "confirm_sendfunds",
        "register",
        "404",
        "reset-password",
        "forgot",
        "interface-select",
        "email-verify",
      ],
      checked: localStorage.getItem("darkMode") === "enabled", // Initialize based on localStorage
      showHeader: false, // Initialize to true or set based on your logic
    };
  },
  computed: {
    isVisible() {
      return !this.hideHeaderPages.includes(this.routeName);
    },
    accountData() {
      return this.$store.getters["core/headerAccountData"];
    },
    ...mapGetters({
      isKYC: "core/isKYC",
      profile: "core/profile",
      coins: "core/coins",
      theme: "core/theme",
    }),
    isAuthorized() {
      return this.$store.getters["core/isAuthorized"];
    },
    username() {
      return this.$store.getters["core/profile"].user.username;
    },
    authorizedMenuItems() {
      return [
        // {
        //   key: "test",
        //   iconClass: "username",
        //   path: "",
        // },
        {
          key: "settings",
          iconClass: "cog",
          path: "/settings",
        },
        {
          key: "support",
          iconClass: "headphones",
          path: "/support",
          target: "_blank",
        },
      ];
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$store.dispatch("core/getProfile");
    }
  },
  methods: {
    changeTheme() {
      const newTheme = this.theme === "dark" ? "light" : "dark";
      this.$store.dispatch("core/changeTheme", newTheme);
      this.cookies.set("theme", newTheme);
    },

    volume() {
      return parseFloat(
        this.getFromObj(
          this.accountData.pairs,
          this.accountData.pairprop + ":volume",
          0
        ) || 0
      ).toFixed(2);
    },

    getLocation() {
      return window.location;
    },

    getLinkInfo(ticker) {
      return this.coins?.[ticker]?.["links"];
    },
  },
};
</script>

<template>
  <div v-show="isVisible" class="">
    <PrimeMenubar :model="items" class="navbar" :checked="checked">
      <!-- Start slot: Add the logo or anything you'd like to start the menu -->
      <template #start>
        <a href="/account">
          <img width="135" src="/public/img/logo-white.svg" />
        </a>
      </template>
      <!-- Customizing menu items (optional, you can skip this template if not needed) -->
      <template #item="{ item, props, hasSubmenu, root }">
        <!-- <div
          v-if="root && item.label === 'Buy Crypto'"
          class="card inline-flex items-center gap-1 px-2 py-2 item-header item-header border-surface-0"
        > -->
        <!-- <PrimeButton
          v-if="!isAuthorized"
          label="Sign Up"
          size="small"
          icon="pi pi-pen-to-square"
          class=""
          @click="$router.push({ name: 'register' })"
        ></PrimeButton> -->
        <!-- <PrimeButton
            v-if="!isAuthorized"
            label="Login"
            size="small"
            icon="pi pi-sign-in"
            severity="secondary"
            @click="$router.push({ name: 'login' })"
          >
          </PrimeButton> -->
        <!-- </div> -->
        <span
          v-if="showHeader"
          class="inline-flex items-center gap-1 px-2 py-2"
        >
          <img width="135" src="/public/img/logo-white.svg" />
          <span class="text-xl font-semibold">
            PRIME<span class="text-primary">APP</span>
          </span>
        </span>
        <span v-if="showHeader" class="hidden"></span>
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a
            :href="href"
            :class="{ test: item.label === 'Sign Up' }"
            class="flex items-center"
            v-bind="props.action"
            @click="navigate"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span></a
          >
        </router-link>
        <a
          v-else
          :class="{ test: item.label === 'Sign Up' }"
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down',
              { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root },
            ]"
          ></i>
        </a>
      </template>

      <!-- End slot: Add any elements like search, profile icons, etc. -->
      <template #end>
        <div class="flex items-center gap-2">
          <PrimeButton
            v-if="!isAuthorized"
            label="Sign Up"
            size="small"
            icon="pi pi-pen-to-square"
            class="btn-hide"
            @click="$router.push({ name: 'register' })"
          ></PrimeButton>
          <PrimeButton
            v-if="!isAuthorized"
            label="Login"
            size="small"
            icon="pi pi-sign-in"
            severity="secondary"
            class="idan"
            @click="$router.push({ name: 'login' })"
          >
          </PrimeButton>
          <PrimeButton
            v-if="isAuthorized"
            type="button"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            size="small"
            style="width: 120px"
            @click="toggle"
          >
            <i class="pi pi-user test-pi" style="font-size: 1rem"></i>
            {{ profile.user.first_name }}
            <i class="pi pi-angle-down" style="font-size: 0.75rem"></i>
          </PrimeButton>
          <PrimeMenu
            id="overlay_menu"
            ref="menu"
            :model="userItems"
            :popup="true"
          >
            <template #item="{ item, props }">
              <router-link
                v-if="item.route"
                v-slot="{ href, navigate }"
                :to="item.route"
                custom
              >
                <a :href="href" v-bind="props.action" @click="navigate">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                </a>
              </router-link>
              <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
              >
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </template>
          </PrimeMenu>
          <LanguageSelector class="mr-2" />
          <ToggleButton
            v-model="checked"
            on-icon="pi pi-moon"
            off-icon="pi pi-sun"
            class=""
            outlined
            @click="toggleDarkMode"
          />
        </div>
      </template>
    </PrimeMenubar>
  </div>
</template>

<style>
.main {
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1001;
}
.themeSelector {
  cursor: pointer;
  /* width: 30px;
  height: 30px; */
  /* position: absolute;
  right: 0;
  top: 0; */
}
.themeSelector.dark {
  transform: scaleX(-1);
}
.navbar {
  border: none !important;
  border-radius: 0px !important;
}
.layout-topbar-action {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color-secondary);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--text-color);
  transition: background-color var(--element-transition-duration);
  cursor: pointer;

  &:hover {
    background-color: var(--surface-hover);
  }

  &:focus-visible {
    @include focused();
  }

  i {
    font-size: 1.25rem;
  }

  span {
    font-size: 1rem;
    display: none;
  }

  &.layout-topbar-action-highlight {
    background-color: var(--primary-color);
    color: var(--primary-contrast-color);
  }
}
.p-togglebutton-label {
  display: none !important;
}
.p-togglebutton {
  /* border: none !important; */
  background: transparent !important;
  /* padding: 5px !important; */
  width: 25px !important;
  height: 25px !important;
  border-radius: 50% !important;
  padding: 0px !important;
}
.p-togglebutton.p-togglebutton-checked {
  background: transparent !important;
}
.p-togglebutton.p-togglebutton-checked::before {
  background: transparent !important;
}
.p-togglebutton-icon {
  font-size: 1.2rem !important;
  color: var(--p-primary-color) !important;
}
.p-menubar {
  min-height: 55px !important;
  padding: 0.5rem !important;
  font-size: 0.85rem !important;
  font-weight: 400 !important;
  /* background: var(--) !important; */
}
.p-menubar-item-link {
  .pi {
    color: var(--p-primary-color) !important;
  }
}
.test {
  background: var(--p-button-primary-background);
  border-radius: var(--p-button-border-radius);
  color: var(--p-button-primary-color) !important;
}
@media screen and (max-width: 510px) {
  .btn-hide {
    display: none !important;
  }
}
@media screen and (min-width: 510px) and (max-width: 2500px) {
  .test,
  .item-header {
    display: none !important;
  }
}
.item-header {
  cursor: auto;
  width: 100%;
  background: transparent !important;
  background-color: transparent !important;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.item-header:hover {
  background: transparent !important;
  background-color: transparent !important;
  color: transparent !important;
}

.test-pi {
  .pi {
    color: var(--p-button-primary-color) !important;
  }
}
.idan {
}
</style>
