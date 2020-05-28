<template>
  <div>
    <!-- tutorial -->
    <!-- tutorial v-if="isShowTutorial" -->
    <div id="tutorial-container" v-if="isShowTutorial">
      <div id="background-tutorial"></div>
      <div id="guide-container">
        <div class="close-icon">
          <v-icon @click="clearTutorialUI()" color="#fff">close</v-icon>
        </div>
        <!-- last draw v-if="tutorialStepNumber === 1" -->
        <div class="guide-top" v-if="tutorialStepNumber === 1">
          <span id="result-draw">{{ getLastDraw | lastDraw2 }}</span>
          <span class="guide-description">{{ $t("tutorial.resultDraw") }}</span>
        </div>
        <!-- bet close in  -->
        <div class="guide-top" v-if="tutorialStepNumber === 2">
          <span class="guide-description text-uppercase" style="font-size:100px"
            >{{ $t("tutorial.calculation") }}...</span
          >
        </div>
        <!-- lottery  -->
        <div class="guide-top" v-if="tutorialStepNumber === 3">
          <span id="lottery-draw-guide-text">
            {{
              getTimerByStockName($route.params.id) &&
                getTimerByStockName($route.params.id).gameEndTimeCountDownInSec
                  | lotterydraw(getStockLoop($route.params.id))
            }}
          </span>
          <span class="guide-description">
            {{ $t("tutorial.lotteryDraw") }}
          </span>
        </div>
        <!-- chart  -->
        <!-- has scroll -->
        <div
          class="guide-top"
          v-if="tutorialStepNumber === 4 && getIsWindowsHasScroll"
        >
          <span class="guide-title text-uppercase">
            {{ $t("tutorial.analyseGraph") }}
          </span>
          <span class="guide-description">
            {{ $t("tutorial.analyseGraph") }}
          </span>
        </div>
        <!-- no scroll -->
        <div
          class="guide-top"
          v-if="tutorialStepNumber === 4 && !getIsWindowsHasScroll"
        >
          <span class="guide-title text-uppercase">analysis graph</span>
          <span class="guide-description">{{ $t("tutorial.stockGraph") }}</span>
        </div>

        <!-- bet on digigt  -->
        <div
          class="guide-top"
          style="margin-right: 90px;"
          v-if="tutorialStepNumber === 5"
        >
          <span class="guide-title text-uppercase">
            {{ $t("tutorial.betOnDigits") }}
          </span>
          <span class="guide-description">
            {{ $t("tutorial.selectDigit") }}
          </span>
        </div>
        <!-- select chipcamount  -->
        <div
          class="guide-top"
          style="margin-right: 90px;"
          v-if="tutorialStepNumber === 6"
        >
          <span class="guide-title text-uppercase">
            {{ $t("tutorial.betConfirm") }}
          </span>
          <span class="guide-description">
            {{ $t("tutorial.betLastDigitEven") }}
          </span>
        </div>
        <!-- enter amount bet -->
        <!-- has scroll   v-if="tutorialStepNumber === 7 && getIsWindowsHasScroll"-->
        <div
          class="guide-top"
          style="margin-top: 190px;"
          id="enter-bet-guide"
          v-if="tutorialStepNumber === 7 && getIsWindowsHasScroll"
        >
          <span class="guide-title text-uppercase">
            {{ $t("tutorial.betOnDigits") }}
          </span>
          <span class="guide-description">{{ $t("tutorial.selectChip") }}</span>
        </div>
        <!-- no scroll -->
        <div
          class="guide-top"
          style="margin-top: 190px;"
          id="enter-bet-guide"
          v-if="tutorialStepNumber === 7 && !getIsWindowsHasScroll"
        >
          <span class="guide-title text-uppercase" style="margin-left: 20px;"
            >bet on digits
          </span>
          <!--has no scroll -->
          <span class="guide-description">{{ $t("tutorial.selectChip") }}</span>
        </div>
        <!-- to scroll here -->
        <div id="enter-amount-to-bet" hidden>hidden</div>
        <!-- to scroll here -->

        <!-- select chipcamount for multi game rules  -->
        <div class="guide-bottom" v-if="tutorialStepNumber === 8">
          <span class="guide-title text-uppercase">
            {{ $t("tutorial.selectAmount") }}
          </span>
          <span class="guide-description">
            {{ $t("tutorial.betMultiGame") }}
          </span>
        </div>
        <!-- road map  -->
        <div class="guide-bottom" v-if="tutorialStepNumber === 9">
          <span class="guide-title text-uppercase">
            {{ $t("tutorial.roadMap") }}
          </span>
          <span class="guide-description">
            {{ $t("tutorial.analyseStock") }}
          </span>
        </div>
        <!-- live betting  -->
        <div
          class="guide-top"
          style="margin-right: 90px;"
          v-if="tutorialStepNumber === 10"
        >
          <span class="guide-title text-uppercase">
            {{ $t("tutorial.liveBet") }}
          </span>
          <span class="guide-description">{{ $t("tutorial.wholeBets") }}</span>
        </div>
      </div>
    </div>
    <!-- tutorial -->
    <!-- tutorial -->
    <!-- Other Stock List popup -->
    <v-dialog v-model="dialogOtherstock" style="position: fixed !important;">
      <v-card color="rgb(0, 62, 111, 0.8)">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialogOtherstock = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-layout row wrap px-2 pt-2>
          <v-flex
            pa-2
            v-for="(data, index) in getAllStocks"
            :key="index"
            xs6
            sm6
            md6
            v-if="$route.params.id !== data.stockName"
          >
            <nuxt-link :to="'/modern/fullscreen/' + data.stockName">
              <v-card class="v-card-style">
                <div
                  class="close-bet-chart"
                  v-if="
                    getTimerByStockName(data.stockName) &&
                      getTimerByStockName(data.stockName).stockStatus ===
                        'Closed'
                  "
                >
                  <span class="text-close-bet">market close</span>
                </div>
                <!-- chart other stocks -->
                <v-card-text class="pa-0" min-height="500"> 
                  <chartApp :stockName="data.stockName"></chartApp>
                </v-card-text>
              </v-card>
              <div class="pt-2" style="color: white;">
                <h3 class="text-uppercase">
                  {{ $t("stockName." + data.stockName) }}
                </h3>
                <h4 style="line-height: 1;">
                  <em>{{ data.loop }}  {{ $t("msg.minuteGame") }}</em>
                </h4>
              </div>
            </nuxt-link>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-container fluid class="containerNew">
      <v-layout pa-1 wrap>
        <v-flex xs4 sm12 md6 lg4>
          <v-layout column>
            <div id="livechartGuidelines">
              <v-flex>
                <v-layout xs12>
                  <v-flex
                    xs12
                    lg4
                    md4
                    class="text-xs-center1"
                    style="width: 100%; align-self: center;"
                  >
                    <div class="stockname">
                      {{ $t(`stockName.${$route.params.id}`) }}
                    </div>
                    <span class="gameid">{{
                      getGameUUIDByStockName($route.params.id)
                    }}</span>
                  </v-flex>

                  <v-flex xs12 md8 lg8 class="text-xs-right topHeader">
                    <v-btn color="buttonRed">
                      {{ getStockLoop($route.params.id) }}
                      {{ $t("msg.minutes") }} 
                    </v-btn>
                    <v-btn
                      color="buttonGreen"
                      @click="dialogOtherstock = true"
                      >{{ $t("msg.otherStock") }}</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex
                mr-1
                xs12
                sm12
                md8
                lg12
                class="chartDesgin"
                id="chartGuidelineNew"
              >
                <chartApp :stockName="$route.params.id"></chartApp>
              </v-flex>
            </div>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md5 lg5>
          <v-flex>
            <v-layout>
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.lastDraw") }}:</span>
                <div id="lastDrawGuideline">
                  <v-flex flex-style class="lastdraw">
                    <h4
                      class="text-black"
                      v-html="$options.filters.lastDraw(getLastDraw)"
                    ></h4>
                  </v-flex>
                </div>
              </v-flex>
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.betCloseIn") }}:</span>
                <div id="betCloseInGuideline">
                  <v-flex flex-style class="betclose">
                    <span
                      v-if="
                        getTimerByStockName($route.params.id) &&
                          getTimerByStockName($route.params.id).stockStatus ===
                            'Closed'
                      "
                      class="text-black"
                    >
                      {{
                        getTimerByStockName($route.params.id) &&
                          "close" | betclosein(getStockLoop($route.params.id))
                      }}
                    </span>
                    <span v-else class="text-black">
                      {{
                        getTimerByStockName($route.params.id) &&
                          getTimerByStockName($route.params.id)
                            .gameEndTimeCountDownInSec
                            | betclosein(getStockLoop($route.params.id))
                      }}
                    </span>
                  </v-flex>
                </div>
              </v-flex>
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.lotteryDraw") }}:</span>
                <div id="lotteryDrawGuidelines">
                  <v-flex flex-style class="lottery">
                    <span class="text-black">
                      {{
                        getTimerByStockName($route.params.id) &&
                          getTimerByStockName($route.params.id)
                            .gameEndTimeCountDownInSec
                            | lotterydraw(getStockLoop($route.params.id))
                      }}
                    </span>
                  </v-flex>
                </div>
              </v-flex>
              <v-flex xs3 class="text-xs-right" style="align-self: flex-end;">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      @click="openTutorial()"
                      fab
                      dark
                      small
                      class="helpButton"
                      title="Help"
                    >
                      <v-icon dark size="25">fa-question</v-icon>
                    </v-btn>
                  </template>
                  <span>Full Game Screen Tutorial</span>
                </v-tooltip>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex id="betButtonGuidelines" xs4 sm12 md12 lg12 mt-4>
            <betButton
              :isFullscreen="true"
              :stockName="$route.params.id"
              :loop="1"
            ></betButton>
          </v-flex>
        </v-flex>
        <v-flex xs12 sm12 md3 lg3 id="live-bet-guide">
          <h3 class="balanceUser" v-if="getUserBalance > 0">
            Acc :

            <span class="userBlanace">
              <animated-number
                :value="getUserBalance"
                :formatValue="formatToPrice"
                :duration="300"
              />
            </span>
          </h3>
          <!-- <h3 class="balanceUser" v-if="getUserBalance == 0">
            Acc :
            <span class="userBlanace">0000.00</span>
          </h3> -->
          <!-- Toggle between two components -->
          <div id="livebetGuidelines">
            <fullscreenchart v-show="!isHidden"></fullscreenchart>
            <fullscreencurrentbet v-show="isHidden"></fullscreencurrentbet>
          </div>
          <v-layout pa-3>
            <v-flex md3 lg3 pt-2 style="text-align:center;">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span class="seticon" v-on="on">
                    <i class="fa fa-user fa-2x iconcolor" />
                    <span>{{ dataliveBetAll.totalUsers }}</span>
                  </span>
                </template>
                <span>{{ $t("liveBetData.totalUsers") }}</span>
              </v-tooltip>
            </v-flex>
            <v-flex md3 lg3 pt-2 style="text-align:center;">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span class="seticon" v-on="on">
                    <i class="fa fa-gamepad fa-2x iconcolor" />
                    <span>{{ dataliveBetAll.totalBetCount }}</span>
                  </span>
                </template>
                <span>{{ $t("liveBetData.totalBet") }}</span>
              </v-tooltip>
            </v-flex>
            <v-flex md4 lg4 pt-2 style="text-align:center;">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span class="seticon" v-on="on">
                    <i class="fa fa-money fa-2x iconcolor" />
                    <span>{{ dataliveBetAll.totalAmountPlaced }}</span>
                  </span>
                </template>
                <span>{{ $t("liveBetData.totalAmount") }}</span>
              </v-tooltip>
            </v-flex>
            <v-flex sm4 md4 lg4 mb-1 style="text-align:center;">
              <v-btn
                @click="isHidden = !isHidden"
                color="buttonGreensmall"
                class="curretbet-btn"
                >{{ $t("menu.currentBet") }}</v-btn
              >
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- live Chart road map -->
        <v-flex xs12 class="text-xs-center">
          <footerBet lg12 md12></footerBet>
          <v-layout
            class="fullroadMap elevation-4"
            id="fullscreen-roadmap-guide"
          >
            <v-flex xs12 sm12 md12 lg12 wrap pt-2 id="roadmapGuidelines">
              <v-layout>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="0"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="1"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="2"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="3"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              right
              fab
              @click="$router.push(closeFullscreen)"
              class="fullscreenclose"
              dark
              v-on="on"
              title="Full Screen"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("msg.closeFullScreen") }}</span>
        </v-tooltip>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import config from "~/config/config.global";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
import footerBet from "~/components/modern/footerbet";
import trendMapFullScreen from "~/components/modern/trendMapFullScreen";
import fullscreenchart from "~/components/modern/fullscreenchart";
import fullscreencurrentbet from "~/components/modern/fullscreencurrentbet";
import secureStorage from "../../../plugins/secure-storage";
import AnimatedNumber from "animated-number-vue";
export default {
  async validate({ params, store }) {
    return store.getters.getCheckStock(params.id);
  },
  layout: "fullscreen",
  components: {
    betButton,
    chartApp,
    footerBet,
    trendMapFullScreen,
    fullscreenchart,
    fullscreencurrentbet,
    AnimatedNumber
  },
  data() {
    return {
      isShowTutorial: false,
      tutorialStepNumber: 0,
      routeParamID: this.$route.params.id,
      dialogOtherstock: false,
      //winner mqrquee
      winner: [],
      pauseTime: 2000,
      pauseOnHover: false,
      scrollSpeed: 30,
      showSpeed: 20,
      isShow: false,
      isHidden: false,
      rule: [],
      msg: "",
      dataliveBetAll: {},
      stockId: "",
      isStep: 0,
      stockName: this.$route.path.split("/")[3],
      loopName: ""
    };
  },
  created() {
    this.getActiveGamesByCategory();
    this.setRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
    if (this.stockName.slice(0, -1) == "btc") {
      this.loopName =
        this.stockName.slice(-1) == 1 ? this.stockName.slice(-1) : "5";
      this.stockName = this.stockName;
    } else {
      this.stockName = this.stockName[3];
      this.loopName = "5";
    }
    this.connectLiveBetCountDataSocket();
  },
  beforeDestroy() {
    window.Echo.leave(
      `roadMap.${this.getStockUUIDByStockName(this.routeParamID)}.${
        this.getPortalProviderUUID
      }`
    );
  },
  mounted() {
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.$route.params.id
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
      },
      ({ data }) => {
        try {
          var logData = data;
          if (data.status) {
            this.setLiveRoadMap(data.data.roadMap[0]);
          } else {
            throw new Error(config.error.general);
          }
        } catch (ex) {
          console.log(ex);
        }
      }
    );
  },
  computed: {
    closeFullscreen() {
      let fullscreenClose = secureStorage.getItem("fullscreenclosed");
      if (
        secureStorage.getItem("fullscreenclosed") == null ||
        secureStorage.getItem("fullscreenclosed") == "undefined"
      ) {
        fullscreenClose = "desktop";
      }
      return `/modern/${fullscreenClose}/${this.$route.params.id}`;
    },
    ...mapGetters([
      "getIsWindowsHasScroll",
      "getGameUUIDByStockName",
      "getAllStocks",
      "getTimerByStockName",
      "getStockUUIDByStockName",
      "getPortalProviderUUID",
      "getUserInfo",
      "getLastDraw",
      "getRoadMap",
      "getStockLoop",
      "getUserBalance",
      "getmultiGameBet"
    ]),
    ...mapState({
      gameStockId: state => state.game.gameStockId
    })
  },
  watch: {
    tutorialStepNumber(newValue) {
      switch (newValue) {
        case 1:
          $("#lastDrawGuideline").css("z-index", "10001");
          break;
        case 2:
          $("#lastDrawGuideline").css("z-index", "1");
          $("#betCloseInGuideline").css("z-index", "10001");
          break;
        case 3:
          $("#betCloseInGuideline").css("z-index", "1");
          $("#lotteryDrawGuidelines").css("z-index", "10001");
          break;
        case 4:
          $("#lotteryDrawGuidelines").css("z-index", "1");
          $("#chartGuidelineNew").css("z-index", "10001");
          if ($(document).height() > $(window).height()) {
            this.setIsWindowsHasScroll(true);
          } else {
            this.setIsWindowsHasScroll(false);
          }
          break;
        case 5:
          $("#chartGuidelineNew").css("z-index", "1");
          $(".betButtonGuide").css("z-index", "10001");
          break;
        case 6:
          $(".betButtonGuide").css("z-index", "1");
          $(".BetButtonGuideEven").css("z-index", "10001");
          break;
        case 7:
          $(".BetButtonGuideEven").click();
          if ($(document).height() > $(window).height()) {
            setTimeout(() => {
              window.scrollTo(0, $(window).height() / 4);
            }, 100);
          }
          break;
        case 8:
          $(".BetButtonGuideEven").css("z-index", "1");
          $("#background-tutorial").click();
          $("#footerBet-guide").css("z-index", "10001");
          break;
        case 9:
          $("#footerBet-guide").css("z-index", "2");
          $("#fullscreen-roadmap-guide").css("z-index", "10001");
          break;
        case 10:
          $("#fullscreen-roadmap-guide").css("z-index", "1");
          $("#live-bet-guide").css("z-index", "10001");
          $("#live-bet-guide").css("backgroundColor", "#fff");
          break;
        default:
          this.clearTutorialUI();
          this.isShowTutorial = false;
      }
    }
  },
  methods: {
    formatToPrice(value) {
      return `R$ ${value.toFixed(2)}`;
    },

    clearTutorialUI() {
      this.tutorialStepNumber = 0;
      this.isShowTutorial = false;
      $("#lastDrawGuideline").css("z-index", "1");
      $("#betCloseInGuideline").css("z-index", "1");
      $("#lotteryDrawGuidelines").css("z-index", "1");
      $("#chartGuidelineNew").css("z-index", "1");
      $(".betButtonGuide").css("z-index", "1");
      $(".BetButtonGuideEven").css("z-index", "1");
      $("#stocklistGuidelines").css("z-index", "1");
      $("#background-tutorial").click();
      $("#fullscreen-roadmap-guide").css("z-index", "1");
      $("#footerBet-guide").css("z-index", "2");
      $("#live-bet-guide").css("z-index", "1");
      $("#live-bet-guide").css("backgroundColor", "#f2f4ff");
    },
    openTutorial() {
      const _this = this;
      let time = this.tutorialStepNumber === 0 ? 0 : 3000;
      setTimeout(() => {
        this.isShowTutorial = true;
        this.tutorialStepNumber++;
        let stepGo = setInterval(() => {
          this.tutorialStepNumber++;
          if (this.tutorialStepNumber > 10 || !_this.isShowTutorial) {
            clearInterval(stepGo);
            this.clearTutorialUI();
          }
        }, 3000);
      }, time);
    },
    ...mapActions([
      "setIsWindowsHasScroll",
      "setRoadMap",
      "setLiveRoadMap",
      "setStockCategory"
    ]),
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    liveBetCountData({ channelName, eventName }, callback) {
      window.Echo.channel(channelName)
        .listen(eventName, callback)
        .on("pusher:subscription_succeeded", async member => {
          try {
            var reqBody = {
              portalProviderUUID: this.getPortalProviderUUID,
              gameUUID: this.getGameUUIDByStockName(this.$route.params.id),
              version: config.version
            };
            var { data } = await this.$axios.post(
              config.liveCountBetData.url,
              reqBody,
              { headers: config.header }
            );
            if (data.status) {
              this.dataliveBetAll = data.data;
            } else {
              throw new Error(config.error.general);
            }
          } catch (ex) {
            console.log(ex);
          }
        });
    },
    connectLiveBetCountDataSocket() {
      this.liveBetCountData(
        {
          channelName: `LiveTotalBetData.${
            this.getPortalProviderUUID
          }.${this.getStockUUIDByStockName(this.stockName)}.${this.loopName}`,
          eventName: "LiveTotalBetData"
        },
        ({ data }) => {
          try {
            var logData = data;
            if (data.status) {
              this.dataliveBetAll = data.data;
            } else {
              throw new Error(config.error.general);
            }
          } catch (ex) {
            console.log(ex);
          }
        }
      );
    },
    async getActiveGamesByCategory() {
      var reqBody = {
        portalProviderUUID: this.getPortalProviderUUID,
        version: config.version
      };
      try {
        var res = await this.$axios.$post(
          config.getActiveGamesByCategory.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.status) {
          this.setStockCategory(res.data);
          this.items = res.data;
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    }
  },
  beforeDestroy() {
    window.Echo.leaveChannel(
      `LiveTotalBetData.${
        this.getPortalProviderUUID
      }.${this.getStockUUIDByStockName(this.stockName)}.${this.loopName}`
    );
  }
};
</script>

<style scoped>
.userBlanace {
  color: #002a68;
}
.close-icon {
  z-index: 10028;
  position: fixed;
  right: 10px;
  top: 20px;
  cursor: pointer;
}
.balanceUser {
  float: right;
  margin: 10px 20px;
}
.chartDesgin {
  margin-top: 10px;
  padding: 5px 5px;
  background-color: #fff;
  border-radius: 10px;
}

.fullscreenclose {
  position: fixed !important;
  border-radius: 180px;
  z-index: 999;
  cursor: pointer;
  bottom: 80px;
  right: 0px;
  width: 50px;
  height: 50px;
  color: #fff;
  background: linear-gradient(
    215deg,
    rgba(156, 44, 205, 1) 35%,
    rgba(121, 59, 204, 1) 100%
  );
}

.fullscreenclose .v-icon {
  font-weight: 800;
  font-size: 30px;
}

.lastdraw {
  border: 1.5px solid #4b65ff;
  border-radius: 10px;
  font-size: 22px;
  padding: 2px 6px;
  font-weight: 400;
}

.betclose {
  font-size: 12px;
  border: 1.5px solid #ef076a;
  border-radius: 10px;
  font-size: 22px;
  padding: 2px 6px;
  font-weight: 400;
}

.lottery {
  font-size: 12px;
  border: 1.5px solid #01e3bf;
  border-radius: 10px;
  font-size: 22px;
  padding: 2px 6px;
  font-weight: 400;
}

.setborder span {
  font-size: 14px;
  line-height: 10px;
}

.setborder {
  text-align: justify;
}

.seticon {
  border: 2px solid #b4b2b2;
  border-radius: 10px;
  padding: 5px 6px;
  text-align: center;
  /*height: 25px;
  min-width: 25px !important; */
}

.seticon i {
  color: #545352;
  font-size: 13px;
}

.seticon span {
  font-weight: 600;
  color: #545352;
  font-size: 15px;
}

.fullroadMap {
  border-top: 10px solid #092968;
  border-left: 2px solid #dddddd;
  border-right: 2px solid #dddddd;
  border-radius: 10px;
  margin-top: -40px;
}

.helpButton {
  background-color: #4464ff !important;
  color: #fff;
  padding: 5px;
  font-size: 22px;
}
</style>
