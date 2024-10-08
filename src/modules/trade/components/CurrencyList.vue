<template>
  <div class="tab-block">
    <ul class="tab-block__nav">
      <li
        v-for="(coin, ticker) in filteredCoins"
        :key="'pairs_' + ticker"
        class="tab-block__nav-link show"
        :class="{ active: topCurrency === ticker }"
      >
        <a
          :id="ticker + '-tab'"
          class="nav-link"
          @click="setTopCurrency(ticker)"
        >
          <span>
            <img :src="getCurrencyLogo(ticker)" class="currency-logo" />
          </span>
          {{ ticker }}
        </a>
      </li>
    </ul>
    <div id="currencyTabsContent" class="tab-content">
      <div
        id="btc"
        class="tab-pane fade show active"
        role="tabpanel"
        aria-labelledby="btc-tab"
      >
        <div class="tab-pane__row flex currency__filter-search">
          <div class="search-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="20"
              height="20"
              viewBox="0 0 256 256"
              xml:space="preserve"
              class="search-input-icon"
            >
              <defs></defs>
              <g
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
              >
                <path
                  d="M 87.803 77.194 L 68.212 57.602 c 9.5 -14.422 7.912 -34.054 -4.766 -46.732 c 0 0 -0.001 0 -0.001 0 c -14.495 -14.493 -38.08 -14.494 -52.574 0 c -14.494 14.495 -14.494 38.079 0 52.575 c 7.248 7.247 16.767 10.87 26.287 10.87 c 7.134 0 14.267 -2.035 20.445 -6.104 l 19.591 19.591 C 78.659 89.267 80.579 90 82.498 90 s 3.84 -0.733 5.305 -2.197 C 90.732 84.873 90.732 80.124 87.803 77.194 z M 21.48 52.837 c -8.645 -8.646 -8.645 -22.713 0 -31.358 c 4.323 -4.322 10 -6.483 15.679 -6.483 c 5.678 0 11.356 2.161 15.678 6.483 c 8.644 8.644 8.645 22.707 0.005 31.352 c -0.002 0.002 -0.004 0.003 -0.005 0.005 c -0.002 0.002 -0.003 0.003 -0.004 0.005 C 44.184 61.481 30.123 61.48 21.48 52.837 z"
                  transform=" matrix(1 0 0 1 0 0) "
                  stroke-linecap="round"
                />
              </g>
            </svg>
            <input
              v-model="searchParameter"
              v-pattern="/^[a-zA-Z\s]{0,24}$/"
              type="text"
              class="tab-pane__search"
            />
          </div>
          <v-icon
            :icon="starredOnly ? 'Star' : 'StarBorder'"
            :color="secondColor ? secondColor : {}"
            class="currency__filter-icon"
            @click="starredOnly = !starredOnly"
          />
        </div>
        <div class="tab-pane__row">
          <div
            class="table-responsive sell-orders currency-table"
            style="overflow-x: hidden"
          >
            <perfect-scrollbar>
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <td>
                      <div class="sell-orders__td"></div>
                    </td>
                    <td
                      v-for="column in [
                        'currency',
                        'price',
                        // 'vol24h',
                        'price24h',
                      ]"
                      :key="column"
                    >
                      <div
                        class="sell-orders__td"
                        style="display: inline-block"
                      >
                        <b
                          class="sort-label"
                          :class="{
                            'sort-label_direction_asc':
                              sorting.column === column &&
                              sorting.direction === SORT_DIRECTIONS.ASC,
                            'sort-label_direction_desc':
                              sorting.column === column &&
                              sorting.direction === SORT_DIRECTIONS.DESC,
                          }"
                          @click="sort(column)"
                          >{{ $t("common." + column) }}</b
                        >
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="pair in sortedPairs"
                    :key="pair['base'] + pair['quote']"
                    class="tr-row"
                    :class="{
                      active:
                        pair.base === currentPair[0] &&
                        pair.quote === currentPair[1],
                      disabled:
                        coins[pair.base].disable_pairs ||
                        coins[pair.quote].disable_pairs,
                    }"
                  >
                    <td style="width: 50px">
                      <div class="cur">
                        <v-icon
                          :icon="isStarred(pair) ? 'Star' : 'StarBorder'"
                          color="var(--theme-primary-color)"
                          @click="toggleStar(pair)"
                        />
                      </div>
                    </td>
                    <td
                      v-if="pair.active"
                      style="cursor: pointer; display: inline-block"
                      @click="setCurrentPair(pair['base'], pair['quote'])"
                    >
                      <div
                        class="currency-table__td"
                        style="width: fit-content"
                      >
                        <div class="currency-table__name">
                          <span>
                            <img
                              :src="getCurrencyLogo(pair.currency)"
                              class="currency-logo"
                            />
                          </span>
                          <span class="cur-color" style="margin-right: 7px">
                            {{ pair.currency }}
                          </span>
                          /<span style="margin-left: 7px">
                            <img
                              :src="getCurrencyLogo(pair.quote)"
                              class="currency-logo"
                            />
                          </span>
                          <span style="color: var(--p-text-color) !important">{{
                            pair["quote"]
                          }}</span>
                        </div>
                      </div>
                    </td>
                    <td v-else>
                      <div class="currency-table__td">
                        <div class="currency-table__name">
                          {{ pair["base"] }}&nbsp;&nbsp;<span
                            style="
                              color: red;
                              font-weight: 300 !important;
                              font-size: 11px !important;
                              text-transform: none;
                            "
                            >(Soon)</span
                          >
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        v-if="pair.active"
                        class="currency-table__td flex align-content-center justify-content-center"
                        style="
                          cursor: pointer;
                          display: inline-block;
                          color: var(--p-text-color) !important;
                        "
                        @click="setCurrentPair(pair['base'], pair['quote'])"
                      >
                        {{ pair.price }}
                      </div>
                    </td>
                    <!-- <td>
                      <div
                        v-if="pair.active"
                        class="currency-table__td"
                        style="cursor: pointer"
                        @click="setCurrentPair(pair['base'], pair['quote'])"
                      >
                        {{ pair.vol24h }}
                      </div>
                    </td> -->
                    <td>
                      <div
                        class="currency-table__td flex align-content-center justify-content-center"
                        style="cursor: pointer; display: inline-block"
                      >
                        <span
                          class="percent"
                          :class="
                            pair24green(`${pair['base']}-${pair['quote']}`)
                              ? 'percent-green'
                              : 'percent-red'
                          "
                        >
                          {{ pair.price24h }}%
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </perfect-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import getCoolTrade from "~/mixins/getCoolTrade";
import getPairs24h from "~/mixins/getPairs24h";
import getFromObj from "~/mixins/helpers";
import getFixedDecimal from "~/mixins/getFixedDecimal";

export default {
  name: "CurrencyList",
  mixins: [getCoolTrade, getFixedDecimal, getPairs24h, getFromObj],
  props: {
    currentPair: {
      type: Array,
      required: true,
    },
    defaultPair: {
      type: String,
      required: false,
      default: '""', // Set a default value here
    },
  },
  emits: ["setCurPair"],
  data() {
    return {
      starredOnly: false,
      starredPairs: [],
      searchParameter: "",
      topCurrency: null,
      sorting: {
        column: "price", // Set default sorting column to 'price'
        direction: "DESC", // Set default sorting direction to 'DESC' for high to low
      },
    };
  },
  computed: {
    ...mapGetters({
      coins: "core/coins",
      pairs: "core/pairs",
      getCurrentQuoteCurrency: "getCurrentQuoteCurrency",
    }),
    currentBaseCurrency() {
      return this.$store.getters["getCurrentBaseCurrency"];
    },
    filteredCoins() {
      let res = Object.fromEntries(
        Object.entries(this.coins).filter(([, coin]) => {
          return coin.base && !coin.disable_pairs && !coin.disable_all;
        })
      );
      return Object.keys(res).length > 0
        ? res
        : { [this.defaultPair.split("-")[1]]: [] };
    },
    getPairsForTopCur() {
      return this.coins[this.topCurrency].pairs;
    },
    filteredPairs() {
      let res = Object.values(this.getPairsForTopCur).filter(({ base }) => {
        return (
          this.coins[base] &&
          this.topCurrency !== base &&
          !this.coins[base].disable_all &&
          !this.coins[base].disable_pairs &&
          base.toUpperCase().includes(this.searchParameter.toUpperCase())
        );
      });
      if (this.starredOnly) {
        res = res.filter((p) => this.isStarred(p));
      }

      return res.map((pair) => ({
        ...pair,
        currency: pair.base,
        price: this.addSpace(this.getTradeCell(pair, false)),
        vol24h: this.addSpace(this.getTradeCell(pair, true)),
        price24h: this.getPairs24h(`${pair["base"]}-${pair["quote"]}`),
      }));
    },

    SORT_DIRECTIONS() {
      return {
        ASC: 1,
        DESC: 2,
      };
    },

    sortedPairs() {
      const column = this.sorting.column,
        direction = this.sorting.direction,
        TEXT_COLUMNS = ["currency"];

      if (column && direction) {
        let output = [...this.filteredPairs].sort((a, b) => {
          if (TEXT_COLUMNS.includes(column)) {
            return a.base < b.base ? -1 : 1;
          } else if (column === "price") {
            // Convert price to a number for correct sorting
            const priceA = parseFloat(a.price.replace(/,/g, ""));
            const priceB = parseFloat(b.price.replace(/,/g, ""));
            return priceB - priceA; // Change to priceB - priceA for high to low
          } else if (column === "24hChange") {
            // Convert percentage to a number for correct sorting
            const changeA = parseFloat(a["24hChange"].replace(/%/g, ""));
            const changeB = parseFloat(b["24hChange"].replace(/%/g, ""));
            return changeB - changeA; // Change to changeB - changeA for high to low
          } else {
            return b[column] - a[column]; // Default for numerical values (high to low)
          }
        });

        if (this.sorting.direction === "ASC") {
          output.reverse(); // Only reverse for ASC, to get low to high
        }

        return output;
      } else {
        return this.filteredPairs;
      }
    },
  },
  watch: {
    getCurrentQuoteCurrency: {
      immediate: true,
      handler(value) {
        this.topCurrency = value;
      },
    },
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      if (
        self.coins[self.currentPair[0]].disable_pairs ||
        self.coins[self.currentPair[1]].disable_pairs
      ) {
        self.$notify({
          type: "error",
          text: self.$t("common.pairDisabled"),
          duration: 15000,
        });
      }
    }, 1500);
  },
  methods: {
    getCurrencyLogo(currency) {
      return "/public/img/common/svgcrypto/" + currency.toLowerCase() + ".svg";
    },
    sort(column) {
      const SORT_OPTIONS = [
        null,
        this.SORT_DIRECTIONS.ASC,
        this.SORT_DIRECTIONS.DESC,
      ];

      if (this.sorting.column === column) {
        this.sorting.direction =
          SORT_OPTIONS[
            (SORT_OPTIONS.indexOf(this.sorting.direction) + 1) %
              SORT_OPTIONS.length
          ];
      } else {
        this.sorting.direction = this.SORT_DIRECTIONS.ASC;
      }
      this.sorting.column = column;
    },

    getTradeCell(pair, volume) {
      return this.getCoolTrade(
        this.getFromObj(
          this.pairs,
          `${pair["base"]}-${pair["quote"]}` + (volume ? ":volume" : ":price"),
          0
        ),
        pair["quote"]
      );
    },
    isStarred(pair) {
      return this.starredPairs.includes(pair.base + ":" + pair.quote);
    },
    toggleStar(pair) {
      const id = pair.base + ":" + pair.quote;
      if (this.isStarred(pair)) {
        this.starredPairs = this.starredPairs.filter((i) => i !== id);
      } else {
        this.starredPairs.push(id);
      }
    },
    setTopCurrency(currency) {
      this.topCurrency = currency;
    },
    setCurrentPair(base, quote) {
      let disabledCurrency = null;

      if (this.coins[base].disable_pairs) {
        disabledCurrency = base;
      } else if (this.coins[quote].disable_pairs) {
        disabledCurrency = quote;
      }
      if (disabledCurrency) {
        this.$notify({
          type: "error",
          text: this.$t("common.pairTradeDisabled", {
            currency: disabledCurrency,
          }),
        });
      } else {
        this.$emit("setCurPair", base, quote);
      }
    },
    pair24green(pair) {
      let pricediff = this.getFromObj(this.pairs, pair + ":price_24h", 0);
      if (pricediff >= 0) {
        return true;
      } else if (pricediff < 0) {
        return false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.cur-color {
  color: var(--p-primary-color) !important;
}

tr.disabled {
  opacity: 0.5;
}

.sell-orders .tr-row td {
  padding-top: 1px;
  padding-bottom: 1px;
}
.currency__filter-icon {
  position: relative;
  top: 6px;
  height: 10px;
  display: block;
  left: 2px;
  width: 24px;
  height: 23px;
}
.currency__filter-search {
  border-bottom: 1px solid #dfe2e6;
}

.sort-label {
  cursor: pointer;
  position: relative;
  user-select: none;
  padding-right: 10px;

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: calc(50% - 3px);
    right: 0;
    border: 3px solid transparent;
    transition: border-color 0.2s;
  }

  &::after {
    transform: translateY(4px);
    border-top-color: #c8c8c8;
  }

  &::before {
    transform: translateY(-4px);
    border-bottom-color: #c8c8c8;
  }

  &_direction {
    &_desc {
      &::before {
        border-bottom-color: #38393a;
      }
    }

    &_asc {
      &::after {
        border-top-color: #38393a;
      }
    }
  }
}
.currency__filter-search {
  border: none !important;
  margin-left: 7px;
  margin-top: 20px;
}
.search-input {
  width: calc(100% - 30px);
  position: relalative;
}
.search-input-icon {
  position: absolute;
  z-index: 2;
  top: 10px;
  left: 15px;
}
.ps {
  height: 350px;
}
.currency-table__name {
  // color: red !important;
  font-weight: 700 !important;
  font-size: 12px !important;
  text-transform: none;
  display: flex;
  align-items: center;
}
.cur {
  height: 24px;
  width: 30px;
}
.currency-logo {
  width: 17px;
  margin-right: 7px;
}
</style>
