<template>
  <BaseComponent>
    <metainfo>
      <template #title="data">{{ data.content.replace(/%7C/g, "|") }}</template>
    </metainfo>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <div v-if="Component">
          <component :is="Component" :key="ind" />
        </div>
      </transition>
    </router-view>
  </BaseComponent>
</template>

<script>
import BaseComponent from "~/components/layout/Base.vue";
import globalWSSubscriptions from "~/helpers/globalWSSubscriptions";
import localConfig from "./local_config";

export default {
  components: {
    BaseComponent,
  },
  mixins: [globalWSSubscriptions],
  metaInfo() {
    return {
      title: localConfig.project_title ? localConfig.project_title : "",
      description: `${localConfig.project_title} ${this.$t(
        "common.invalid_code"
      )} `,
    };
  },
  data: () => ({
    ind: 1,
  }),
  watch: {
    "$route.params.walletitem": {
      handler: function (value, old) {
        if (value && old && value != old) this.ind++;
      },
    },
    "$route.params.pairprop": {
      handler: function (value, old) {
        if (value && old && value != old) this.ind++;
      },
    },
  },
  beforeMount() {
    this.checkUserIP();
  },
  mounted() {
    localStorage.setItem(
      "project_title",
      localConfig.project_title ? localConfig.project_title : ""
    );
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = `https://api.sumsub.com/idensic/static/sumsub-kyc.js`;
    let x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);

    // this.checkUserIP();
  },
  methods: {
    async checkUserIP() {
      try {
        // Fetch the user's IP information
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        console.log("User IP Info:", data); // Log the IP info for debugging

        // Check if the user is from Israel
        if (data.country === "IL") {
          const userIP = data.ip;
          const allowedIP = ["213.137.74.31", "84.229.72.226"]; // List of allowed IPs

          console.log("User IP:", userIP); // Log the user's IP
          console.log("Allowed IP:", allowedIP);

          // Redirect if the user is from Israel but not the allowed IP
          if (!allowedIP.includes(userIP.trim())) {
            console.log(
              "Redirecting to: https://pool4ever.com/app-out-service"
            );
            window.location.href = "https://pool4ever.com/app-out-service";
          } else {
            console.log("User allowed to access.");
          }
        } else {
          console.log("User is not from Israel");
        }
      } catch (error) {
        console.error("Error fetching IP information: ", error);
      }
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
