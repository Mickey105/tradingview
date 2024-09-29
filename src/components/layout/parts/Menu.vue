<template>
  <div v-click-outside="closeMenu" class="header__menu" @click="toggleIsOpen">
    <div class="burger">
      <img
        class="burger__image"
        width="24"
        height="24"
        src="/public/img/menu/menu-point.svg"
      />
      <span class="burger__text">{{ $t("common.menu") }}</span>
    </div>
    <ul class="navigation" :class="{ navigation__open: isOpenMenu }">
      <li
        v-for="item in menuItems"
        :key="item.key"
        class="navigation__item"
        :class="{ 'navigation__item--disabled': item.disabled }"
      >
        <router-link v-if="item.rout" class="navigation__link" :to="item.path">
          <svg
            v-if="item.iconClass === 'credit-card-alt'"
            class="navigation__link__img"
            width="20"
            height="20"
            viewBox="0 0 2304 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1504v-608h2304v608q0 66-47 113t-113 47h-1984q-66 0-113-47t-47-113zm640-224v128h384v-128h-384zm-384 0v128h256v-128h-256zm1888-1152q66 0 113 47t47 113v224h-2304v-224q0-66 47-113t113-47h1984z"
            />
          </svg>
          <svg
            v-if="item.iconClass === 'line-chart'"
            class="navigation__link__img"
            width="20"
            height="20"
            viewBox="0 0 2048 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2048 1536v128h-2048v-1536h128v1408h1920zm-128-1248v435q0 21-19.5 29.5t-35.5-7.5l-121-121-633 633q-10 10-23 10t-23-10l-233-233-416 416-192-192 585-585q10-10 23-10t23 10l233 233 464-464-121-121q-16-16-7.5-35.5t29.5-19.5h435q14 0 23 9t9 23z"
            />
          </svg>
          <svg
            v-if="item.iconClass === 'exchange'"
            class="navigation__link__img"
            width="20"
            height="20"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1792 1184v192q0 13-9.5 22.5t-22.5 9.5h-1376v192q0 13-9.5 22.5t-22.5 9.5q-12 0-24-10l-319-320q-9-9-9-22 0-14 9-23l320-320q9-9 23-9 13 0 22.5 9.5t9.5 22.5v192h1376q13 0 22.5 9.5t9.5 22.5zm0-544q0 14-9 23l-320 320q-9 9-23 9-13 0-22.5-9.5t-9.5-22.5v-192h-1376q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1376v-192q0-14 9-23t23-9q12 0 24 10l319 319q9 9 9 23z"
            />
          </svg>
          <svg
            v-if="item.iconClass === 'list-ul'"
            class="navigation__link__img"
            width="20"
            height="20"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M384 1408q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm0-512q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm-1408-928q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z"
            />
          </svg>
          <svg
            v-if="item.iconClass === 'support'"
            class="navigation__link__img"
            width="20"
            height="20"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1728 886q0 166-60 314l-20 49-185 33q-22 83-90.5 136.5t-156.5 53.5v32q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23v32q71 0 130 35.5t93 95.5l68-12q29-95 29-193 0-148-88-279t-236.5-209-315.5-78-315.5 78-236.5 209-88 279q0 98 29 193l68 12q34-60 93-95.5t130-35.5v-32q0-14 9-23t23-9h64q14 0 23 9t9 23v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-32q-88 0-156.5-53.5t-90.5-136.5l-185-33-20-49q-60-148-60-314 0-151 67-291t179-242.5 266-163.5 320-61 320 61 266 163.5 179 242.5 67 291z"
            />
          </svg>
          {{ $t(`common.${item.key}`) }}
          <span v-if="item.soon" class="soon"> ({{ $t("common.soon") }}) </span>
        </router-link>
        <a
          v-if="!item.rout"
          class="navigation__link"
          rel="noopener noreferrer nofollow"
          :href="item.url"
        >
          <svg
            v-if="item.iconClass === 'mining'"
            class="navigation__link__img"
            width="20"
            height="20"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M113.844 17.72c-8.426.04-16.812.833-25.094 2.436C195.65 84.503 275.473 170.516 338.47 270c2.526-53.76-19.07-109.13-53.533-154.25-14.097 5.298-31.477.742-43.468-11.25-11.98-11.98-16.558-29.347-11.282-43.438C194.46 34.105 153.68 17.52 113.844 17.72zm380.562 20.405L423.47 115.75l30.06 125.563-55.092 8.78-19.407 80.626 73.5 39.124-41.25 55.937 29.658 44.033-88.782-27.625 16.5-43.844L291.97 364.5l13.124-84.563-111.375 58.125-4.22 78.25-112.22-27.656-33.25 104.156h450.376V38.125zM261.156 58.72c-.388.01-.776.028-1.156.06-3.644.325-6.882 1.696-9.188 4-6.147 6.15-5.746 18.88 3.875 28.5 9.622 9.623 22.353 10.024 28.5 3.876 6.148-6.148 5.747-18.878-3.875-28.5-5.637-5.637-12.335-8.096-18.156-7.937zM196.5 127.593L25.28 298.874c4.273 11.926 11.027 21.05 25.25 25.626L221.97 153c-7.796-8.89-16.308-17.333-25.47-25.406zm158.78 11.625l9.314 84.686 27.437-84.687h-36.75zm-132.03 74.968l-20.156 35.937 92.687 7.375-72.53-43.313z"
            ></path>
          </svg>
          <!-- <i class="fa" aria-hidden="true"></i> -->
          {{ $t(`common.${item.key}`) }}
          <span v-if="item.soon" class="soon"> ({{ $t("common.soon") }}) </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import menuHelper from "~/mixins/menuHelper";

export default {
  name: "MenuBlock",
  mixins: [menuHelper],
  computed: {
    ...mapGetters({ profile: "core/profile" }),
    menuItems() {
      const items = [
        {
          key: "wallet",
          iconClass: "credit-card-alt",
          path: "/wallet",
          rout: true,
        },
        {
          key: "buysell",
          iconClass: "line-chart",
          path: "/trade/BTC-USDT",
          rout: true,
        },
        {
          key: "exchange",
          iconClass: "exchange",
          path: "/quick-swap",
          rout: true,
        },
        {
          key: "fees",
          iconClass: "list-ul",
          path: "/fees",
          rout: true,
        },
        {
          key: "mining",
          iconClass: "mining",
          rout: false,
          url: "https://pool4ever.com",
        },
        {
          key: "support",
          iconClass: "support",
          path: "/support",
          rout: true,
        },
      ];
      return items;
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  position: absolute;
  font-family: "Open Sans", arial, sans-serif;
  min-width: 210px;
  background-color: #fff;
  top: 40px;
  right: 40px;
  opacity: 0;
  visibility: hidden;
  height: 0;
  transition: height 0.05s ease-in;
  z-index: 1;
  max-height: 80vh;
  overflow-y: auto;

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

  &__open {
    height: auto;
    opacity: 1;
    visibility: visible;
    position: absolute;
    // background-color: #fff;
    top: 40px;
    right: 40px;
    z-index: 1;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.25);
    border-radius: 0px;
    padding: 0;
  }

  &__item {
    height: 50px;

    .soon {
      color: red;
      font-weight: 200;
      font-size: 10px;
      text-transform: lowercase;
      margin-left: 5px;
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.75;
    }

    .wallet-margin-fix {
      margin-right: 22px;
    }

    &.router-link-active {
      background-color: #f3f3f3;
    }
  }
}

.fa {
  margin: 0 27px 0 3px;
  font-size: 20px;
}

.navigation {
  .fa-line-chart {
    margin-right: 24px;
  }

  .fa-users {
    margin-right: 25px;
  }

  .fa-fw {
    margin-right: 20px;
  }
}
.navigation__link__img {
  margin-right: 20px;
  margin-left: 0;
}
</style>
