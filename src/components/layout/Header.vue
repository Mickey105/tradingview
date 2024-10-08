<template>
  <NavbarComponent />
  <div
    v-show="isVisible"
    id="header"
    :class="[
      'header',
      $route.name === 'trade-pair' || $route.path === '/'
        ? 'header--market'
        : '',
      isAuthorized ? '' : 'header--no-auth',
    ]"
  >
    <!-- <div class="header__logo"> -->
    <!-- <a class="header__logo-link" href="/">
        <img
          width="135"
          :src="
            localConfig.logo ? localConfig.logo : '/public/img/logo-white.svg'
          "
        />
      </a> -->
    <!-- </div> -->

    <div v-if="accountData" class="header__ether p-3">
      <div class="header__ether-img">
        <img
          style="height: 46px"
          :src="
            coins[accountData?.currentBaseCurrency].logo.length > 0
              ? coins[accountData?.currentBaseCurrency].logo
              : `/public/img/common/svgcrypto/${accountData?.currentBaseCurrency?.toLowerCase()}.svg`
          "
          :alt="accountData.currentBaseCurrency"
        />
      </div>
      <div class="header__ether-info">
        <div
          class="header__ether-info-title flex gap-3 align-content-center align-items-center"
        >
          {{ accountData?.currentPair[0] }}/{{ accountData?.currentPair[1] }}
          <span style="border-left: solid; width: 1px; height: 20px"></span>
          <div
            class="total__rating"
            style="font-size: 17px; color: var(--p-primary-color)"
          >
            {{ calculatedPrice }} $
          </div>
        </div>
        <div v-if="accountData" class="middle-list__title">
          {{ coins[accountData?.currentPair?.[0]]?.name }}
        </div>
        <!-- <span class="header__ether-info-text v1">
          {{ $t("common.header.volume") }}:
          {{
            addSpaceFixDecimal(
              volume() || 0,
              coins[accountData?.currentQuoteCurrency]?.decimals || 8
            )
          }}&nbsp;
          {{ accountData?.currentQuoteCurrency }}
        </span> -->
      </div>
    </div>
    <div class="header__etc">
      <div class="header__etc-middle">
        <div v-if="accountData" class="middle-list__title">
          {{ coins[accountData?.currentPair?.[0]]?.name }}
          <span class="header__ether-info-text"></span>
          <ul class="header__links gap-2">
            <span class="flex flex-column font-normal text-xs">
              <span class="">24h Change</span>
              <span>accountData?price24h</span>
            </span>
            <span class="flex flex-column font-normal text-xs">
              <span class="">24h High</span>
              <span>7%</span>
            </span>
            <span class="flex flex-column font-normal text-xs">
              <span class="">24h Low</span>
              <span>7%</span>
            </span>
            <span class="flex flex-column font-normal text-xs">
              <span class=""
                >24h Volume ({{ accountData?.currentQuoteCurrency }})</span
              >
              <span
                >{{
                  addSpaceFixDecimal(
                    volume() || 0,
                    coins[accountData?.currentQuoteCurrency]?.decimals || 8
                  )
                }}&nbsp;</span
              >
            </span>
            <li class="header__links-item">{{ $t("common.site") }}:</li>
            <li
              v-for="link in getLinkInfo(accountData.currentBaseCurrency)"
              :key="link.href"
              class="header__links-item"
            >
              <a
                :href="link.href"
                rel="noopener noreferrer nofollow"
                target="_blank"
                class="header__links-link"
                >{{ link.title }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- <NavbarComponent /> -->
</template>

<script>
// import MenuComponent from "~/components/layout/parts/Menu.vue";
import { mapGetters } from "vuex";
import menuHelper from "~/mixins/menuHelper";
import helpers from "~/mixins/helpers";
import handleLogout from "~/mixins/handleLogout";
import getFixedDecimal from "~/mixins/getFixedDecimal";
// import LanguageSelector from "~/components/layout/parts/LanguageSelector.vue";
import { useCookies } from "vue3-cookies";
import NavbarComponent from "~/components/layout/Navbar.vue";

// Import the EventBus
// import { EventBus } from "../../components/layout/evenBus";
import eventBus from "../../static/public/evenBus"; // Using alias for easier path resolution

export default {
  name: "HeaderComponent",
  components: { NavbarComponent },
  mixins: [menuHelper, handleLogout, helpers, getFixedDecimal],
  props: {
    routeName: {
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
      calculatedPrice: 0, // Initialize calculatedPrice
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
      isStakanPriceRising: "isStakanPriceRising",
    }),
    isAuthorized() {
      return this.$store.getters["core/isAuthorized"];
    },
    username() {
      return this.$store.getters["core/profile"].user.username;
    },
    pair24hPrice() {
      // Debugging: Check if accountData is available
      if (!this.accountData) {
        console.error("accountData is missing.");
        return "N/A";
      }

      if (!this.coins) {
        console.error("coins data is missing.");
        return "N/A";
      }

      // Debugging: Log the currentPair
      console.log("Current Pair:", this.accountData.currentPair);

      if (!this.accountData.currentPair || !this.accountData.currentPair[0]) {
        console.error("currentPair is missing in accountData.");
        return "N/A";
      }

      // Get the base currency (like BTC)
      const baseCurrency = this.accountData.currentPair[0];

      // Debugging: Log the baseCurrency and check if it's in coins
      console.log("Base Currency:", baseCurrency);

      if (!this.coins[baseCurrency]) {
        console.error(`No coin data found for ${baseCurrency}`);
        return "N/A";
      }

      // Get price_24h and debug log
      const coinData = this.coins[baseCurrency];
      console.log("Coin Data:", coinData);

      if (!coinData.price_24h) {
        console.error(`price_24h is missing for ${baseCurrency}`);
        return "N/A";
      }

      // Convert to percentage and return
      const price24h = (coinData.price_24h * 100).toFixed(2);
      console.log("24h Price Change:", price24h);

      return price24h;
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
  // watch: {
  //   recenttrades: {
  //     immediate: true,
  //     trade: this.getPriceForStakan,
  //     handler(trades) {
  //       this.$store.commit(
  //         "setIsStakanPriceRising",
  //         trades[0].price >= this.currentPriceStakan
  //       );
  //       // Emit the calculated price using EventBus
  //       eventBus.emit("calculatedPriceUpdated", this.getPriceForStakan);
  //     },
  //   },
  // },
  mounted() {
    // Listen for the calculatedPriceUpdated event
    eventBus.on("calculatedPriceUpdated", (price) => {
      this.calculatedPrice = price;
    });
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

<style lang="scss" scoped>
.header {
  // background: var(--p-content-background);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  // position: fixed;
  // left: 0;
  // right: 0;
  top: 60px;
  // z-index: 500;
  // width: 100%;
  // margin: 00px 15px 0;
  // margin: auto;
  border-radius: 15px;
  margin: 15px 15px 0px 15px;

  &__links {
    display: flex;
  }

  &__links-item {
    font-weight: 100;
  }

  &__links-link {
    display: block;
    font-size: 13px;
    margin-top: 1px;

    &:before {
      color: #ffd545 !important;
      content: "|";
      padding: 0 5px;
    }

    &:hover {
      text-decoration: none;
    }
  }

  &__login-no-auth {
    border: 1px solid #333d59;
    border-radius: 20px;
    position: relative;
    text-align: center;
    line-height: 2;

    &:hover {
      text-decoration: none;
    }

    @media screen and (max-width: 450px) {
      flex: 0 0 80px;
    }
  }

  &__logo {
    padding-right: 1rem;
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-right: 1px solid #29324a;
    min-height: 70px;

    & img {
      max-height: 48px;
    }

    @media screen and (max-width: 675px) {
      border-right: none;
    }
  }

  &__logo-link {
    position: relative;
  }

  &__logo-beta {
    position: absolute;
    top: -10px;
    left: 16px;
    color: #008766;
    border: 2px solid #008766;
    border-radius: 3px;
    padding: 0px 3px;
    font-size: 9px;
    font-weight: 600;
    background-color: #1b293d;
  }

  &__author {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    border-radius: 20px;
    position: relative;
    min-width: 50px;
    height: 32px;
    margin-right: 10px;
    padding-left: 30px;
    background-size: 18px;

    &:before {
      content: "";
      width: 1px;
      height: 70px;
      background-color: #29324a;
      position: absolute;
      left: -7px;
      top: 50%;
      margin-top: -35px;
    }

    @media screen and (max-width: 425px) {
      min-width: 38px;
    }

    img {
      margin-left: 3px;
      height: 10px;
      margin-right: 3px;
    }
  }

  &__author-name {
    max-width: 150px;
    padding: 0 5px;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen and (max-width: 510px) {
      // display: none;
    }
  }

  &__author-image {
    margin-left: 5px;
    margin-right: 5px;
  }

  &__author-wrap {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }

  &__ether {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    // border-right: 1px solid #29324a;

    @media screen and (max-width: 675px) {
      border-right: none;
    }
  }

  &__ether-img {
    width: 71px;
    height: 46px;

    img {
      margin-right: 25px;
    }
  }

  &__ether-info {
    font-size: 17px;
    font-family: "Open Sans", arial, sans-serif;
    // color: white;
    line-height: 1.2;
  }

  &__ether-info-text {
    display: inline-block;
    font-size: 12px;
  }

  &__ether-info-title {
    font-weight: bold;
    // text-transform: uppercase;
  }

  &__etc {
    flex: 1;
    padding-left: 1rem;
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  &__language {
    position: relative;
    margin-left: 15px;
    border-radius: 50px;
    cursor: pointer;
    width: 40px;
    height: 32px;
    text-align: center;

    &:before {
      content: "";
      width: 1px;
      height: 70px;
      background-color: #29324a;
      position: absolute;
      left: -7px;
      top: 50%;
      margin-top: -35px;
    }
  }
}

.header__links-item:nth-child(2) .header__links-link:before,
.header__links .first:before {
  content: "";
  padding-left: 0;
}

.middle-list__title {
  font-size: 14px;
  font-family: "Open Sans", arial, sans-serif;
  font-weight: bold;
  // color: white;
  line-height: 1.2;

  .header__ether-info-text {
    font-size: 17px;
  }
}

.middle-list__link {
  color: #b4cee2;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;

  &:hover {
    color: #88b3d4;
  }
}

.author-list {
  font-family: "Open Sans", arial, sans-serif;
  min-width: 140px;
  position: absolute;
  background-color: #fff;
  top: 40px;
  right: 40px;
  opacity: 0;
  visibility: hidden;
  height: 0;
  transition: height 0.05s ease-in;
  z-index: 1;

  &__item {
    height: 50px;

    &.router-link-active {
      background-color: #f0edf3;
    }
  }

  &__link {
    // color: #19243c;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    font-size: 16px;
    padding: 0.5rem;

    &:hover {
      color: black;
      text-decoration: none;
      background-color: #dcdcdc;
    }

    img {
      margin-left: 15px;
    }
  }

  .fa-credit-card-alt {
    margin: 0 23px 0 2px;
    font-size: 15px;
  }

  .fa-cog {
    margin: 0 24px 0 2px;
    font-size: 21px;
  }

  .fa-headphones {
    margin: 0 23px 0 2px;
    font-size: 20px;
  }

  .fa-sign-out {
    margin: 0 21px 0 4px;
    font-size: 20px;
  }
}

.author-list-open {
  height: auto;
  opacity: 1;
  visibility: visible;
  -webkit-box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 0px;
  padding: 0;
}

.activateCODE {
  text-align: center;
  padding: 4px 1px;
  -webkit-flex: 0 0 245px;
  -ms-flex: 0 0 245px;
  cursor: pointer;
  flex: 0 0 245px;
  color: #ffffff;
  margin-right: auto;
  border: 1px solid #333d59;
  border-radius: 20px;
  margin-left: 15px;
  position: relative;
  -webkit-border-radius: 20px;
  @media screen and (max-width: 850px) {
    font-size: 0;
    border: none;
    flex: 0;
  }
}

.header__etc-middle {
  flex: 1;
}

.header__etc {
  position: relative;
  padding-right: 35px;
  &.p-codes {
    flex: 1;
  }
}

.header--market {
  .header__ether {
    min-height: 70px;

    @media screen and (max-width: 670px) {
      // display: none;
    }
  }

  .header__etc-middle {
    flex: 1;
    margin-right: 10px;

    @media screen and (max-width: 1024px) {
      .middle-list__title {
        // display: none;
      }
    }
  }

  .header__author-name {
    font-weight: 400;
    @media screen and (max-width: 1090px) {
      // display: none;
    }
  }
}

.header--no-auth {
  .burger__text {
    display: initial;
    text-transform: none !important;
  }
}

.header__author-wrap {
  padding: 0 5px;
  margin-right: 15px;
}

.header__menu:before {
  content: "";
  width: 1px;
  height: 70px;
  background-color: #29324a;
  position: absolute;
  left: -7px;
  top: 50%;
  margin-top: -35px;
  // display: none;
}

.header__menu {
  padding-left: 12px;
  border-radius: 20px;
  position: relative;
}

.burger {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  height: 32px;
}
.author-list .author-list__link-icon {
  width: 30px;
  height: 21px;
  margin-left: 0;
  margin-right: 15px;
}
.author-list__link {
  height: 50px;
}
.themeSelector {
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0;
  top: 0;
}
.themeSelector.dark {
  transform: scaleX(-1);
}
.header-deopsit-btn {
  position: relative;
  left: 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 25px;
  height: 33px;
  font-size: 14px;
  // line-height: 20px;
  // letter-spacing: 0.05em;
  text-transform: none !important;
  color: #000000;
  padding: 7px 13px 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.buy {
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 25px;
  height: 32px;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  // letter-spacing: 0.05em;
  color: #000000;
  padding: 7px 10px 10px;
  background: #ffd545;
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 95px;
  justify-content: center;
}
@media (max-width: 800px) {
  .header-deopsit-btn {
    // display: none;
  }
  .buy {
    font-size: 12px;
    line-height: 15px;
    font-weight: bold;
    text-align: center;
  }
}
</style>
