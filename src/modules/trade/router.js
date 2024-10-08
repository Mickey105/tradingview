import lazyLoadView from "~/utilities/lazyLoad";

export default [
  {
    path: "/trade/:pairprop",
    name: "trade-pair",
    // component: () => import("~/modules/trade/pages/Trade.vue"),

    // component: lazyLoadView("~/modules/trade/pages/Trade.vue"), // Simply pass the path

    // component: lazyLoadView(() => import("~/modules/trade/pages/Trade.vue")),

    component: lazyLoadView(import("~/modules/trade/pages/Trade.vue")),
    // component: lazyLoadView(() => import("~/modules/trade/pages/Trade.vue")),
    // component: () => import("~/modules/trade/pages/Trade.vue"),

    props: true,
  },
  {
    path: "/trade",
    name: "trade",
    redirect: "/trade/BTC-USDT",
  },
];
