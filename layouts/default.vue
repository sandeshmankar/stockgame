<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      right
      class="side-bar"
    >
      <v-list>
        <!-- Close button cross mark for mobile responsive side bar -->
        <v-btn icon @click="drawer = !drawer" style="float: right;">
          <v-icon>clear</v-icon>
        </v-btn>
        <div v-for="(item, i) in menu" :key="i">
          <v-list-tile
            :to="item.to"
            router
            exact
            class="text-primary text-uppercase"
          >
            <v-list-tile-content>
              <v-list-tile-title>
                {{ $t(`menu.${item.title}`) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>
        </div>
        <v-list-tile @click="getLogout()">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("profile.signOut") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="clipped"
      class="pa-3 text-primary light-toobar setheight"
    >
      <v-flex class="pa-2">
        <nuxt-link to="/modern">
          <v-toolbar-title>
            <v-img width="30" src="/favicon.png"></v-img>
          </v-toolbar-title>
        </nuxt-link>
      </v-flex>

      <v-spacer></v-spacer>

      <button flat @click="$refs.language.showDialog()">
        <countryFlag :country="countryflag" size="normal" />
      </button>
      <languageDialog ref="language" />

      <mobileLogout size="normal" />
      <v-toolbar-side-icon @click="drawer = !drawer" :elevation="0" />
    </v-toolbar>

    <div
      class="title-layout"
      v-show="
        isShow == 'history' ||
          isShow == 'stock-list' ||
          isShow == 'current-bet' ||
          isShow == 'notification' ||
          isShow == 'rule' ||
          isShow == 'leaderboard' ||
          isShow == 'setting'
      "
    >
      <h2 class="text-uppercase" v-show="isShow == 'history'">
        {{ $t("menu.history") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'stock-list'">
        {{ $t("menu.stockList") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'current-bet'">
        {{ $t("menu.currentBet") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'notification'">
        {{ $t("menu.notification") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'rule'">
        {{ $t("menu.rule") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'leaderboard'">
        {{ $t("menu.leaderBoard") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'setting'">
        {{ $t("menu.setting") }}
      </h2>
      <v-btn
        to="/modern/history"
        v-show="isShow == 'current-bet'"
        class="buttonGreen"
        style="float: right; top: -98%;"
        >{{ $t("menu.history") }}</v-btn
      >
    </div>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <snackbar />

    <app-dialogs-confirm
      v-on:dialogStatus="dialogStatus"
      :dialogConfirm="dialogConfirm"
      :title="$t('logout.sure')"
      :content="$t('logout.bye')"
    />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import menu from "~/data/menuMobile";

import countryFlag from "vue-country-flag";
import languageDialog from "~/components/mobile/LanguageDialog";
import mobileLogout from "~/components/mobile/mobileLogout";
import AppDialogsConfirm from "~/components/dialogsConfirm";
import i18n from "vue-i18n";
import secureStorage from "../plugins/secure-storage";
import Button from "~/components/Button";
import Snackbar from "../components/mobile/Snackbar.vue";

export default {
  components: {
    AppDialogsConfirm,
    countryFlag,
    languageDialog,
    mobileLogout,
    Button,
    Snackbar
  },
  data() {
    return {
      dialogConfirm: false,
      clipped: false,
      drawer: false,
      fixed: false,
      menu: menu,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "EC gaming",
      isShow: ""
    };
  },
  created() {
    this.connectUserBalanceSocket();
  },
  mounted() {
    setInterval(() => {
      this.isShow = location.pathname.split("/")[2];
    });
  },
  methods: {
    ...mapActions(["setUserBalance"]),
    getLogout() {
      this.dialogConfirm = true;
    },
    dialogStatus(value) {
      if (value) {
        secureStorage.removeItem("AUTH");
        const URL = secureStorage.getItem("referrerURL");
        location.href = "http://" + URL;
        this.dialogConfirm = false;
      }
      this.dialogConfirm = false;
    },
    listenUserBalance({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    connectUserBalanceSocket() {
      this.listenUserBalance(
        {
          channelName: `balanceUpdate.${this.getUserUUID}`,
          eventName: "balanceUpdate"
        },
        ({ data }) => {
          try {
            var logData = data;
            if (data.status) {
              this.setUserBalance(data.data.userBalance);
            } else {
              throw new Error(config.error.general);
            }
          } catch (ex) {
            console.log(ex);
          }
        }
      );
    }
  },
  beforeDestroy() {
    window.Echo.leaveChannel(`balanceUpdate.${this.getUserUUID}`);
  },
  computed: {
    ...mapGetters(["getLocale", "getUserUUID", "getPortalProviderUUID"]),
    countryflag() {
      return this.getLocale;
    }
  }
};
</script>

<style scoped>
.light-toobar {
  background-color: #fff !important;
}
.layout-logout {
  display: flex;
  border: 1px solid #ccc;
  border-bottom: none;
  border-top: none;
  border-right: none;
}

.title-layout {
  background: url("/bg/Inner-page-banner.png");
  background-size: cover;
  height: 45px;
  width: 100%;
  color: white;
  padding: 5px 0px 0px 45px;
}
.side-bar {
  z-index: 101;
  width: 250px !important;
}
</style>
