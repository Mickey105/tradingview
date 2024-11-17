<template>
  <div :style="mainTextLocal ? `color: ${mainTextLocal}` : {}">
    <div
      :style="
        mainBackgroundLocal
          ? `background: ${mainBackgroundLocal} !important`
          : {}
      "
    >
      <!-- <NavbarComponent></NavbarComponent> -->
      <HeaderComponent v-if="!simpleLayout" />
      <div class="content" :class="{ 'content--simple': simpleLayout }">
        <slot />
      </div>
      <FooterComponent v-if="!simpleLayout" />
      <notification-root />
      <modal-root />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <!-- <div v-html="customCss"></div> -->
      <!-- <div :style="customCss"></div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NotificationRoot from "~/components/notifications/NotificationRoot.vue";
import ModalRoot from "~/components/modal/ModalRoot.vue";
import HeaderComponent from "~/components/layout/Header.vue";
import FooterComponent from "~/components/layout/Footer.vue";
import { Init } from "~/utilities/manager";
import localConfig from "~/local_config";
import { useCookies } from "vue3-cookies";
// import NavbarComponent from "~/components/layout/Navbar.vue";

export default {
  name: "LayoutComponent",
  components: {
    HeaderComponent,
    FooterComponent,
    NotificationRoot,
    ModalRoot,
    // NavbarComponent,
  },
  props: {
    contentClass: {
      type: String,
      default: "",
    },
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      interval: null,
      isLoading: false,
      simpleLayout: true,
      color: "#CCC",
      updatingCoinsData: false,
    };
  },
  computed: {
    ...mapGetters({
      areCoinsLoaded: "core/areCoinsLoaded",
      coins: "core/coins",
    }),
    colorFromScript() {
      return "";
    },
    inputColorLocal() {
      return localConfig?.themes?.[this.currentTheme]?.input_color || "";
    },
    inputTextLocal() {
      return localConfig?.themes?.[this.currentTheme]?.input_text || "";
    },
    loginTextLocal() {
      return localConfig?.themes?.[this.currentTheme]?.login_text || "";
    },
    blockColorLocal() {
      return localConfig?.themes?.[this.currentTheme]?.block_color || "";
    },
    mainColorLocal() {
      return localConfig?.themes?.[this.currentTheme]?.main_color || "";
    },
    mainBackgroundLocal() {
      return localConfig?.themes?.[this.currentTheme]?.main_background || "";
    },
    mainTextLocal() {
      return localConfig?.themes?.[this.currentTheme]?.main_text || "";
    },
    cancelLocal() {
      return localConfig?.themes?.[this.currentTheme]?.cancel_color || "";
    },
    secondLocal() {
      return localConfig?.themes?.[this.currentTheme]?.second_color || "";
    },
    borderLocal() {
      return localConfig?.themes?.[this.currentTheme]?.border_color || "";
    },
    hoverLocal() {
      return localConfig?.themes?.[this.currentTheme]?.hover_color || "";
    },
  },
  watch: {
    "$route.path": "checkLayout",
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  mounted() {
    let theme = this.cookies.get("theme");
    if (theme && theme === "dark") {
      this.$store.dispatch("core/changeTheme", "dark");
    } else {
      this.$store.dispatch("core/changeTheme", "light");
    }
  },

  methods: {
    startUpdatingCoinsData() {
      if (this.updatingCoinsData) return;
      this.updatingCoinsData = true;
      this.updateCoinsData();
      this.interval = setInterval(() => this.updateCoinsData(), 5 * 60 * 1000);
    },

    async updateCoinsData() {
      Init.Base();
    },

    checkLayout() {
      if (
        this.$route.name === "login" ||
        this.$route.name === "register" ||
        this.$route.name === "forgot" ||
        this.$route.name === "email-verify" ||
        this.$route.name === "confirm-withdrawal-request" ||
        this.$route.name === "reset-password" ||
        this.$route.name === "confirm-register" ||
        this.$route.name === "interface-select" ||
        this.$route.name === "404"
      ) {
        this.simpleLayout = true;
      } else {
        this.simpleLayout = false;
        this.startUpdatingCoinsData();
      }
    },
  },
};
</script>

<style lang="scss">
.content--simple {
  // background: #36373c;
  padding: 0 !important;
}
.stack-precision #select-stack-precision,
.address-text-field,
// .logIn__form__input,
.country-select__selected-country,
.changePassword__input,
// .coinSelector__elem,
.selector__current,
.formField__readonly,
.formField__input,
.trade-input__input,
.mx-input {
  // color: v-bind(ssurface-cardecondLocal) !important;
  // background: v-bind(borderLocal) !important;
  // border-color: v-bind(borderLocal) !important;
}
.coinSelector__elem {
  // background: v-bind(borderLocal) !important;
}
.coinSelector__elem:hover {
  // background: v-bind(secondLocal) !important;
}
.eye-pass,
.show-password-icon-btn,
.update-order-modal,
.modal-window,
.wallet,
.tab-block__nav,
.table-list,
.otc,
.limit-list,
.navigation-language__link.selected,
.navigation-language,
.author-list,
.navigation__open,
.walletlist,
.exchange,
.table,
.balancelist,
.historylist,
.trade-menus,
.recent-trades__title,
.trades,
.user-orders,
.plate,
.card {
  // background: v-bind(blockColorLocal);
  background: var(--p-content-background);
  // color: var(--text-color);
}

.smile-st3 {
  fill: v-bind(blockColorLocal) !important;
}
.big_btn,
.modal-action-button,
.logIn__popup,
.withdrawal__btn,
#header {
  // background-color: var(--p-content-background) !important;
  background-color: var(--p-content-background) !important;
}
.btn-primary {
}
.support__title-bar {
  // background: var(--surface-card);
  // border-radius: 15px !important;
  border-top: 15px !important;
  background-color: var(--p-content-background) !important;
  // color: v-bind(secondLocal) !important;
  font-size: 22px !important;
}
.footer-links-column a,
.support__content-item a,
.support__nav-item:hover a {
  // color: v-bind(mainTextLocal) !important;
  background: var(--p-content-background);
}
.support__nav-item:hover .faq-icon {
  // background-color: v-bind(mainColorLocal) !important;
}
.wallet-history__header,
.walletTable__header,
.tab-block__nav-link.active,
.tab-block__nav-link,
.trade-menus__link,
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active,
.stack-precision,
.wallet-list--tooltip-layer,
.currency-list,
.wallet-list,
.support__content-card,
.support__nav-card,
.select__item {
  // background-color: v-bind(blockColorLocal) !important;
  background: var(--p-content-background);
  // color: var(--p-primary-color) !important;
}
.select__item p {
  color: v-bind(mainTextLocal) !important;
}
.select__item:hover {
  background-color: v-bind(mainColorLocal) !important;
}
.select__item:hover p {
  color: v-bind(loginTextLocal) !important;
}
.address_btn,
.address-text-field,
.currency-list .currency-table .table tbody tr.active,
.wallet-list .currency-table .table tbody tr.active,
.nav-tabs .nav-link:not(.active),
.alert-container,
.footer {
  // background-color: v-bind(mainBackgroundLocal) !important;
  background-color: v-bind(mainBackgroundLocal) 50%;
}
.footer__social-item {
  color: v-bind(mainTextLocal) !important;
}
.footer__social-item path {
  // fill: v-bind(mainTextLocal) !important;
}
.wr-line,
.wr-line b,
.logIn__title,
.header__ether-info-text,
.header__links-link:before,
.header__links-link,
.header__ether-info-title,
.middle-list__title,
.burger__text,
.header__author-name,
.non-auth-page__sub-title,
.select__description-title,
.select__description-subtitle {
  // color: rgb(34, 37, 41) !important;
}
.header__author-img path,
.burger__image,
.header__author-image {
  // background-color: white !important;
}
.sell-orders__td,
.coinSelector__price,
.totalBalance,
.trade-input__caption,
.tab-block__nav-link.active,
.currency-list .nav-link,
.history__coin,
.receivedBlock,
.receivedBlock label,
.receivedBlock div,
.plate-back,
.coinSelector__title,
.walletTable__coin span,
.walletTable__coin strong,
.wallet-table__td-name,
::placeholder,
.page-item-custom a,
.wallet-table__sell-buy-btn,
.itemStatusUp,
.navigation-language__link,
.navigation-language__link.selected,
.author-list__link,
.navigation__link,
h1,
h2,
h3,
h4,
h5,
p {
  // color: #f8d761 !important;
  // opacity: 1;
}
.navigation-language__link {
  opacity: 0.5;
}
.tab-pane__search {
  border: 1px solid v-bind(borderLocal) !important;
}
.walletTable__column,
th.walletTable__header,
.currency__filter-search,
.order-tables__sell-buy,
.tab-block__nav-link.active,
.settings__NAME,
.stack-precision {
  border-bottom: 1px solid #f8d761 !important;
}

.order-tables__sell-buy,
.footer,
.sell-orders-sell-buy hr,
.walletTable__item1,
.walletTable__item,
.wallet-history__items {
  border-top: 1px solid v-bind(borderLocal) !important;
}
.author-list__link-icon,
.navigation__link__img {
  // fill: v-bind(mainTextLocal) !important;
}
.btn-danger {
  background: v-bind(cancelLocal) !important;
}
.header-deopsit-btn,
.support__nav-link--active .faq-icon {
  background: #ffd545;
}
.register__link span,
.register__link,
.exchange__not-enough .link,
.width-button-link,
.wallet-history__items .wallet-history__tx button,
.wallet-history__items .wallet-history__operation,
.wallet-history__items .wallet-history__status,
.support__content-item a,
.support__nav-card--contacts a,
.support__content-voc span {
  // color: v-bind(secondLocal) !important;
  // background-color: var(--p-content-background) !important;
}
.register__link {
}
#themeSelector,
.wallet__action--deposit use {
  fill: v-bind(secondLocal) !important;
}
.wallet__action--withdrawal path,
.wallet__action--history path {
  // fill: v-bind(mainTextLocal) !important;
}
.search-input-icon path,
.currency-table svg {
  fill: var(--p-primary-color) !important;
}
.trade-menus__nav-item,
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active,
.trade-menus__links,
.trade-menus__content,
.trade-menus__block {
  // border-right: 0.5px solid var(--surface-50);
}
.trade-menus__content,
.trade-menus__block {
  border-right: 0.5px solid var(--surface-50);
}
.stake-field_input-max {
  background: v-bind(blockColorLocal) !important;
  color: v-bind(mainTextLocal) !important;
  border-color: solid var(--surface-50) !important;
}
.show-password-icon path {
  background: v-bind(mainColorLocal) !important;
  // fill: v-bind(mainTextLocal) !important;
}
</style>
