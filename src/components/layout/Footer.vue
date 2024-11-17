<template>
  <div class="block-content">
    <div class="ng-star-inserted">
      <div
        class="bg-surface-0 dark:bg-surface-800 px-6 py-12 md:px-12 lg:px-20 text-center"
      >
        <PrimeDivider></PrimeDivider>
        <div
          class="grid grid-cols-12 gap-4 justify-content-evenly items-center gap-4"
        >
          <div
            class="col-span-12 md:col-span-3 flex flex-wrap justify-center md:mb-0 mb-1"
          >
            <img
              src="https://pool4ever.com/Pool4ever-Designs/LogoText.png"
              style="width: 300px; padding: 5px"
              alt="Image"
            />
          </div>
          <!-- <p-divider layout="vertical" /> -->

          <div class="col-span-12 md:col-span-3">
            <div class="font-medium leading-normal mb-4">Spot</div>
            <a class="text-color leading-normal block cursor-pointer mb-2"
              >Wallet</a
            >
            <a class="text-color leading-normal block cursor-pointer mb-2"
              >Trade</a
            >
            <a class="text-color leading-normal block cursor-pointer mb-2"
              >Quick Swap</a
            >
            <a class="text-color leading-normal block cursor-pointer mb-2"
              >Fees % Limits</a
            >
          </div>
          <div class="col-span-12 md:col-span-3">
            <div class="font-medium leading-normal mb-4">More</div>
            <a class="text-color leading-normal block cursor-pointer mb-2"
              >Buy Crypto</a
            >
            <a class="text-color leading-normal block cursor-pointer mb-2"
              >Markets Rates</a
            >
            <a class="text-color leading-normal block cursor-pointer mb-2"
              >Mining Pools</a
            >
            <a
              class="text-color leading-normal block cursor-pointer mb-2 flex justify-center gap-2 items-center"
            >
              <span>Help Center</span>
              <!-- <app-day-night></app-day-night> -->
            </a>
          </div>
        </div>
        <PrimeDivider></PrimeDivider>
        <div class="card"></div>
        <PrimeDivider class="w-full"></PrimeDivider>
        <div class="copyright-note">
          © 2021-2024 <span class="text-primary">Pool4Ever.com</span> All rights
          reserved<br /><br />
        </div>
        <span
          ><a
            class="text-primary"
            href="mailto:admin@pool4ever.com"
            target="_blank"
            >admin&#64;pool4ever.com</a
          ></span
        >
      </div>
    </div>
  </div>
  <!-- 
<div class="col-span-12 md:col-span-3">
    <div class=" mb-4">
        <i class="pi pi-inbox rounded-border p-1 mr-2"></i>
    </div>
</div> -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FooterBlock",
  data() {
    return {
      current_date: new Date(),
      cookie_message_accept: !!localStorage.getItem("cookie_message_accept"),
    };
  },
  computed: {
    ...mapGetters({
      profile: "core/profile",
    }),
    lang() {
      return this.$locale;
    },
  },
  methods: {
    hideCookieMessage() {
      localStorage.setItem("cookie_message_accept", true);
      this.cookie_message_accept = true;
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  padding: 65px 0 77px;
  border-top: 1px solid #d9d9d9;
  // background: #fff;
}
.footer-content-wrapper {
  display: flex;
  justify-content: space-between;
}
.footer-copy {
  width: 18%;
}
.copyright {
  font-size: 15px;
  margin-bottom: 13px;
  // color: #ffd545;
}
.rights {
  font-size: 14px;
  margin-bottom: 22px;
}
.footer-langs {
  position: relative;
  display: inline-block;
}
.footer-langs-btn {
  font-size: 14px;
  width: 98px;
  height: 46px;
  border: 1px solid #b4c0db;
  border-radius: 5px;
  padding: 5px 17px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--theme-primary-color);
  font-size: 13px;
  white-space: nowrap;
}
.footer-links {
  display: flex;
  justify-content: space-around;
  width: 43%;
}
.footer-links-column {
  display: flex;
  flex-direction: column;
}
.footer-links-column a {
  color: #42a4ff;
  font-size: 16px;
  margin-bottom: 16px;
  font-weight: 500;
}
.footer-links-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 21px;
  text-transform: capitalize;
}
.footer-text {
  width: 24%;
}
.footer-text-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 9px;
}
.footer-text-p {
  font-size: 14px;
  margin-bottom: 19px;
}
.navigation-language {
  display: none;
  position: absolute;
  top: 51px;
  left: 0;
  border: 1px solid #b4c0db;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
}
.navigation-language__link {
  color: #000;
  text-transform: capitalize;
  cursor: pointer;
  display: block;
  padding: 4px 0;
}
.navigation-language.active {
  display: block;
}

.footer-content {
  width: 1400px;
  margin: 0 auto;
}

@media (max-width: 1400px) {
  .footer-content {
    width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 900px) {
  .footer-content-wrapper {
    display: flex;
    flex-direction: column;
  }
  .footer {
    padding: 26px 0 29px;
  }
  .footer-links {
    order: -1;
  }
  .footer-links {
    flex-wrap: wrap;
    width: 100%;
  }
  .footer-links-column {
    width: 50%;
  }
  .footer-links-column a {
    font-size: 12px;
    margin-bottom: 14px;
  }
  .footer-links-title {
    font-size: 16px;
    margin-bottom: 9px;
  }
  .footer-text {
    width: 100%;
    order: -1;
    padding-top: 16px;
  }
  .footer-copy {
    width: 100%;
    padding-top: 30px;
  }
  .footer-text-p {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .copyright {
    font-size: 12px;
  }
  .footer-langs-btn {
    font-size: 13px;
    width: 71px;
    height: 38px;
    border: 1px solid #b4c0db;
    border-radius: 5px;
    padding: 5px 9px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .rights {
    font-size: 12px;
  }
}
.footer-langs {
  display: none !important;
}
.footer .btn {
  height: 52px;
  background: var(--theme-primary-color);
  border-radius: 5px;
  font-weight: 400;
  color: #fff;
  text-align: center;
  font-size: 16px;
  padding: 15px 26px;
  display: inline-block;
  width: 102px;
}
.footer__socials-container {
  display: flex;
  flex-wrap: wrap;
}
.footer__socials-container svg {
  display: inline-block;
}
.footer__social-item {
  width: 40%;
  padding-right: 10px;
  color: #42a4ff;
  display: flex;
  gap: 5px;
}
.footer__social-item span {
  width: 20px;
  height: 15px;
  display: inline-block;
  text-align: center;
  margin-left: -5px;
}
</style>
