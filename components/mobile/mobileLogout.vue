<template>
  <div style="z-index:100">
    <template>
      <nuxt-link :to="'/modern/userprofile/' + getUserInfo.userUUID">
        <v-btn flat>
          <v-avatar size="35" mr-1>
            <img :src="imgProfile" alt />
          </v-avatar>
          <div class="userLogoutMenu">
            <span> {{ getUserName }} </span>
            <span
              >&nbsp; {{ $t("msg.acc") }}:
              <animated-number
                :value="getUserBalance"
                :formatValue="formatToPrice"
                class="balance"
              />
            </span>
          </div>
        </v-btn>
      </nuxt-link>
    </template>

    <v-dialog v-model="dialogprofile" max-width="1240px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <button class="cancel" @click="dialogprofile = false">X</button>
        </v-card-actions>
        <v-card-text>
          <profile v-if="dialogprofile" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <OnlineHistory ref="onlineHistory"></OnlineHistory>
    <StockAnalysis ref="stockAnalysis"></StockAnalysis>
  </div>
</template>

<script>
import OnlineHistory from "~/components/mobile/onlineHistory";
import StockAnalysis from "~/components/mobile/stockAnalysis";
import AnimatedNumber from "animated-number-vue";
import { mapGetters } from "vuex";
import profile from "~/pages/modern/desktop/profile";
import config from "~/config/config.global";
import secureStorage from "../../plugins/secure-storage";

export default {
  components: {
    profile,
    AnimatedNumber,
    OnlineHistory,
    StockAnalysis
  },
  data() {
    return {
      dialogprofile: false,
      defaultImage: "/no-profile-pic.jpg"
    };
  },
  computed: {
    ...mapGetters([
      "getUserName",
      "getBalance",
      "getUserInfo",
      "getUserBalance"
    ]),
    imgProfile() {
      return this.getUserInfo.profileImage === null
        ? this.defaultImage
        : `${config.apiDomain}/` + this.getUserInfo.profileImage;
    }
  },
  methods: {
    nFormatter(num, digits) {
      var si = [
        {
          value: 1,
          symbol: ""
        },
        {
          value: 1e3,
          symbol: "k"
        },
        {
          value: 1e6,
          symbol: "M"
        },
        {
          value: 1e9,
          symbol: "G"
        },
        {
          value: 1e12,
          symbol: "T"
        },
        {
          value: 1e15,
          symbol: "P"
        },
        {
          value: 1e18,
          symbol: "E"
        }
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (
        (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
      );
    },
    formatToPrice(value) {
      // return `$ ${this.nFormatter(value, 2)}`;
      return ` ${Number(value)
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1, ")}`;
    },
    getLogout() {
      this.$swal({
        title: window.$nuxt.$root.$t("msg.sure"),
        text: window.$nuxt.$root.$t("msg.bye"),
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Logout!",
        cancelButtonText: "No, Cancel Logout!",
        closeOnConfirm: false,
        closeOnCancel: false
      }).then(isConfirm => {
        if (isConfirm.value) {
          this.$swal({
            title: "Good Bye EC Gaming!",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(Confirm => {
            window.close();
          });
        } else {
          this.$swal({
            title: "Cancelled Logout",
            type: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.v-menu__content {
  border-radius: 15px;
}

.v-list {
  padding: 0px;
}

.userLogoutMenu {
  font-size: 12px;
  float: left;
  text-align: left;

  display: inline-grid;
}

.userLogoutMenu .balance {
  color: #003f70;
  font-size: 16px;
}

.v-list__tile i {
  font-size: 16px;
}

.v-list__tile .v-list__tile__title {
  margin-left: 5px;
  text-transform: capitalize;
  font-size: 14px;
}

.fa-15x {
  font-size: 1.45em;
}

.margin-right-5 {
  margin-right: 4px;
}

.v-avatar {
  -webkit-box-align: center;
  align-items: center;
  border-radius: 50%;
  display: -webkit-inline-box;
  display: inline-flex;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  text-align: center;
  vertical-align: middle;
  border: 2px solid;
}
</style>
