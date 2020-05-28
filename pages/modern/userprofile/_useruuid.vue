<template>
  <div xs2>
    <section v-if="messageError == false" style="background-color:;">
      <v-container>
        <v-flex>
          <v-layout justify-center row>
            <v-flex class="profileBackground">
              <div class="leftFollowDiv">
                <div
                  style="flex-grow: wrap; width: 120px; margin: 0 10px;min-height: 36px !important;"
                >
                  {{ $t("profile.historyPeriod") }}:
                  <v-select
                    v-model="filter"
                    height="10px"
                    dense
                    hide-details
                    :items="[
                      {
                        text: $t('profile.1month'),
                        value: 1
                      },
                      {
                        text: $t('profile.2months'),
                        value: 2
                      },
                      {
                        text: $t('profile.3months'),
                        value: 3
                      }
                    ]"
                    solo
                  ></v-select>
                </div>
              </div>
            </v-flex>
          </v-layout>

          <v-layout justify-center row style="margin-top:-40px;">
            <v-flex>
              <div class="profile-img-container">
                <img
                  :src="userImgProfile(visitProfileUserData.userImage)"
                  class="grey darken-4"
                />
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-layout row justify-center class="name">
          <v-flex>
            <v-layout wrap sm12 xs12>
              <v-flex xs12>
                <div
                  class="font-weight-medium"
                  v-if="visitProfileUserData.username"
                >
                  @{{ visitProfileUserData.username }}
                </div>

                <span
                  v-if="visitProfileUserData.currentActiveTime === 'offline'"
                  >{{ visitProfileUserData.currentActiveTime }}</span
                >
                <span v-else>
                  {{ $t("profile.lastActive") }} :
                  {{ visitProfileUserData.currentActiveTime }}
                </span>
              </v-flex>
              <v-flex xs12>
                <span
                  class="font-weight-medium"
                  v-if="visitProfileUserData.userUUID == getUserUUID"
                >
                  <nuxt-link to="/modern/profile">
                    <a class="editButton"
                      >{{ $t("msg.edit") }} {{ $t("menu.profile") }}</a
                    >
                  </nuxt-link>
                </span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center>
          <v-flex xs12 style="text-align:center;">
            <v-btn
              v-if="visitProfileUserData.userUUID != getUserUUID"
              v-bind:class="[
                visitProfileUserData.userUUID != getUserUUID &&
                visitProfileUserData.isFollowing == 0
                  ? 'buttonFollow'
                  : 'buttonunFollow'
              ]"
              v-on:click="
                followUserBet(
                  visitProfileUserData.username,
                  visitProfileUserData.userImage,
                  visitProfileUserData.userUUID,
                  visitProfileUserData.isFollowing
                )
              "
            >
              {{
                visitProfileUserData.isFollowing == 0
                  ? $t("userAction.follow")
                  : $t("userAction.unFollow")
              }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container mb-5>
        <v-layout row wrap>
          <v-flex xs12 mt-1 v-if="messageError == false">
            <v-layout pa-3 wrap justify-center>
              <v-flex xs6 sm3>
                <div class="cul-box" style="color: #7e57c2;">
                  <span>
                    <fa
                      icon="percentage"
                      style="font-size: 40px; color: #7e57c2;"
                    />
                  </span>
                  <span class="number-box"
                    >{{ visitProfileUserData.winRate }}%</span
                  >
                  <span class="des-title text-uppercase">
                    {{ $t("leaderBoard.winningRate") }}
                  </span>
                </div>
              </v-flex>
              <v-flex xs6 sm3>
                <div class="cul-box cul-box-green">
                  <span>
                    <fa
                      icon="money-bill-wave"
                      style="font-size: 40px; color: #2bb13a;"
                    />
                  </span>
                  <span class="number-box">
                    {{ visitProfileUserData.totalBets }}
                  </span>
                  <span class="des-title text-uppercase">
                    {{ $t("msg.totalBet") }}
                  </span>
                </div>
              </v-flex>

              <v-flex xs6 sm3>
                <div class="cul-box cul-box-red">
                  <span>
                    <fa icon="users" style="font-size: 40px; color: #e73762;" />
                  </span>
                  <span class="number-box">
                    {{ visitProfileUserData.followerCount }}
                  </span>
                  <span class="des-title text-uppercase">
                    {{ $t("profile.followers") }}
                  </span>
                </div>
              </v-flex>
              <v-flex xs6 sm3>
                <div class="cul-box cul-box-yellow">
                  <span>
                    <fa
                      icon="money-bill-alt"
                      style="font-size: 40px; color: #f19135;"
                    />
                  </span>
                  <span class="number-box"
                    >${{ visitProfileUserData.totalWinAmount | currency }}</span
                  >
                  <span class="des-title text-uppercase">
                    {{ $t("leaderBoard.winningAmount") }}
                  </span>
                </div>
              </v-flex>
            </v-layout>
            <div class="container-content">
              <div class="box-container"></div>
              <div class="pa-2 stock-history">
                <h3 class="text-uppercase text-center" justify-center>
                  {{ $t("profile.onlineHistory") }} {{ $t("profile.chart") }}
                </h3>
                <div class="stock-history-container">
                  <VueApexCharts
                    v-if="series.length > 0"
                    type="bar"
                    height="350"
                    :options="chartOptions"
                    :series="series"
                    :key="componentKey"
                  />
                </div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <v-layout v-if="this.messageError == true">
      <v-flex pa-2>
        <div class="container-content">
          <div class="box-error">
            <h2>Sorry, this content isn't avaiable right now</h2>
            <p>
              The Link you followed have expired, or the page may only be
              visiable to an audiencce you're not in.
            </p>
            <a @click="$router.push('/modern/desktop/userprofile/')"
              >Go back to the previous Page</a
            >
            <a @click="$router.push('/modern/desktop/btc1/')"
              >EC Game Home Page</a
            >
          </div>
        </div>
      </v-flex>
    </v-layout>

    <!-- Follow and UnFollow Dialog box-->
    <v-dialog
      v-model="followDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark style="background-color:#2cb13b;">
          <v-btn icon dark @click="followDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{ this.FolloworNot == 1 ? "Follow Bet " : "UnFollow Bet" }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <followBet
          :username="this.username"
          :userImage="this.userImage"
          :FollowerUserUUID="this.FollowUserUUID"
          :isFollowing="this.FolloworNot"
          @followBetClose="closeFollowBet"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueApexCharts from "vue-apexcharts";
import config from "~/config/config.global";
import followBet from "~/components/mobile/follow/followBet";
import date from "date-and-time";
import secureStorage from "../../../plugins/secure-storage";

export default {
  components: {
    followBet,
    VueApexCharts
  },
  data() {
    return {
      followDialog: false,
      myProfileImage: "",
      componentKey: 0,
      renderComponent: true, // render Follow Bet
      username: "",
      FollowUserUUID: "",
      FolloworNot: "",
      userImage: "",
      dialog: false,
      defaultImage: "/no-profile-pic.jpg",
      messageError: false,
      startDate: "",
      endDate: "",
      visitProfileUserData: "",
      filter: 1,
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function(chart, w, e) {}
          },
          toolbar: {
            show: false
          }
        },
        colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "12px"
            }
          }
        }
      }
    };
  },
  created() {
    this.setFilter(30);
    this.getUserProfileByID();
  },
  computed: {
    ...mapGetters([
      "getPortalProviderUUID",
      "getUserUUID",
      "getUserInfo",
      "getLocale"
    ])
  },
  watch: {
    filter() {
      this.setFilter(this.filter * 30);
      this.getUserProfileByID();
    },
    getLocale() {
      this.series[0].name = this.$root.$t("msg.onlineActiveTime");
      this.componentKey++;
    }
  },
  methods: {
    // Render Follow Bet Component
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.followDialog = false;
      this.getUserProfileByID();
    },
    // Follow User Bet
    followUserBet: function(username, userImg, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = userImg
        ? this.userImgProfile(userImg)
        : this.defaultImage;
      this.followDialog = true;
      this.forceRerender();
    },
    // Profile Image Set
    userImgProfile(userImg) {
      return userImg ? `${config.apiDomain}/` + userImg : this.defaultImage;
    },
    setFilter(duration) {
      const now = date.format(new Date(), "YYYY-MM-DD");
      const lastWeek = date.addDays(new Date(), -duration);
      this.startDate = date.format(lastWeek, "YYYY-MM-DD");
      this.endDate = now;
    },
    // fetch Visitor User Profile Infomation.
    async getUserProfileByID() {
      try {
        if (!this.$route.params.useruuid) {
          this.userNew = this.getUserUUID;
        } else {
          this.userNew = this.$route.params.useruuid;
        }
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          visitingUserUUID: this.userNew,
          dateRangeFrom: this.startDate,
          dateRangeTo: this.endDate,
          version: config.version
        };
        var res = await this.$axios.$post(
          config.getVisitUserProfile.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.status) {
          this.messageError = false;
          this.visitProfileUserData = res.data;
          this.myProfileImage = res.data.userImage;

          //  series
          let series = [];
          let xaxis = [];
          res.data.activeTimeDateWise.forEach(element => {
            series.push(element.activeTimeInMins);
            xaxis.push(element.Date);
          });
          this.series = [
            {
              name: this.$root.$t("msg.onlineActiveTime"),
              data: series
            }
          ];
          this.chartOptions.xaxis.categories = xaxis;
          this.componentKey++;
        } else {
          this.messageError = true;
          // throw new Error(config.error.general);
        }
      } catch (ex) {
        console.error(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
      }
    }
  }
};
</script>
<style scoped>
.profileBackground {
  background: url(/bg/Inner-page-banner.png);
  background-size: cover;
  height: 100px;
  width: 100%;
  color: white;
  padding: 5px 0px 0px 45px;
}
.name div {
  width: 100% !important;
  text-align: center;
}
.leftFollowDiv {
  float: right;
  display: flex;
  align-items: center;
}

/* 
Error Box When User Not Found
*/
.box-error {
  border: 1px solid #dddddd;
  background-color: #fff;
  padding: 40px;
}

.box-error h2 {
  border-bottom: 1px solid #dddddd;
  margin-bottom: 20px;
  color: #003e70;
}

.box-error a {
  color: #003e70;
  font-weight: 500;
  margin-right: 10px;
}

/* Error Box End Here */

.editButton {
  color: #2bb13a;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
}

.stock-history-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 0 3px gray;
  border-radius: 5px;
}

.des-title {
  color: black !important;
  font-weight: 500;
}

.number-box {
  font-size: 18px;
  font-weight: bolder;
}

.box-container {
  display: flex;
  width: 100%;
}

.cul-box {
  padding: 5px;
  border-radius: 10px;
  border: #c0acef solid 2px;
  background-color: #fff;
  margin: 10px;
  box-shadow: 0 0 2px #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
.cul-box-green {
  border-color: #2bb13a !important;
  color: #2bb13a;
}

.cul-box-yellow {
  border-color: #f19135 !important;
  color: #f19135;
}

.cul-box-red {
  border-color: #e73762 !important;
  color: #e73762;
}

.container-content {
  padding-top: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
}

.profile-crowd {
  position: absolute;
  z-index: 1;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  border: #fff solid 1px;
  background-color: #8b4448;
  top: -12px;
  right: -9px;
  padding: 4px;
}
.profile-img-container {
  width: 100%;
  text-align: center;
}
.profile-img-container img {
  margin: 0 auto;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #fff !important;
  border: 3px solid #d4d6dc !important;
  padding: 4px;
}

.profile-name-tittle {
  font-weight: bolder;
  font-size: 22px;
}

.flex-container {
  display: flex;
  align-items: center;
}

.profile-name-container {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  position: relative;
  padding-left: 12px;
}

.buttonFollow {
  color: #fff !important;
  border-radius: 3px;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  font-size: 14px;
  width: 110px;
  height: 34px;
  flex-grow: wrap;
}

.buttonunFollow {
  color: #fff !important;
  border-radius: 3px;
  background-image: linear-gradient(to right, #888787 30%, #626161 51%);
  font-size: 14px;
  height: 34px;
  flex-grow: wrap;
}
</style>
