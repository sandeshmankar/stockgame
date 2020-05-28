<template>
  <!-- <v-flex xs6>
  <div class="border-flex">-->
  <v-layout class="multiplescreen">
    <v-flex xs12 class="pt-2">
      <h3 class="text-uppercase ml-4 heading">
        {{ $t("stockName." + stockid) }} {{ getStockLoop(stockid) }}
        {{ $t("msg.minutes") }} {{ $t("msg.loop") }}
      </h3>
      <chartApp :stockName="stockid" />

      <!-- <livechart  :StockData="getStockById(stockid).prices" /> -->
      <v-layout>
        <v-flex align-left class="totalPrice">
          <h4>
            {{
            formatToPrice(
            getAmountBettingByStockId(getGameUUIDByStockName(stockid))
            )
            }}
          </h4>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-flex>
        <v-layout>
          <v-flex class="text-xs-center" px-2>
            <span class="text-gray">{{ $t("msg.lastDraw") }}:</span>
            <v-flex class="lastdraw">
              <span class="text-black" v-html="$options.filters.lastDraw(lastDraw)"></span>
            </v-flex>
          </v-flex>
          <v-flex class="text-xs-center" px-2>
            <span class="text-gray">{{ $t("msg.betCloseIn") }}:</span>
            <v-flex class="betclose">
              <span
                v-if="
                  getTimerByStockName(stockid) &&
                    getTimerByStockName(stockid).stockStatus === 'Closed'
                "
                class="text-black"
              >
                {{
                getTimerByStockName(stockid)
                | betclosein(getStockLoop(stockid))
                }}
              </span>
              <span v-else class="text-black">
                {{
                getTimerByStockName(stockid) &&
                getTimerByStockName(stockid).gameEndTimeCountDownInSec
                | betclosein(getStockLoop(stockid))
                }}
              </span>
            </v-flex>
          </v-flex>
          <v-flex class="text-xs-center" px-2>
            <span class="text-gray">{{ $t("msg.lotteryDraw") }}:</span>
            <v-flex class="lottery">
              <span class="text-black">
                {{
                getTimerByStockName(stockid) &&
                getTimerByStockName(stockid).gameEndTimeCountDownInSec
                | lotterydraw(getStockLoop(stockid))
                }}
              </span>
            </v-flex>
          </v-flex>
        </v-layout>

        <betButton :isFullscreen="true" :stockName="stockid" :loop="getStockLoop(stockid)"></betButton>
        <v-btn @click="setAfterFullScreenClosePage" fab class="multiplefull" style="float:right;">
          <v-icon>fullscreen</v-icon>
        </v-btn>
      </v-flex>
    </v-flex>
  </v-layout>
  <!-- </div>
  </v-flex>-->
</template>

<script>
import { mapGetters } from "vuex";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
import config from "~/config/config.global";
import secureStorage from "../../plugins/secure-storage";
// import livechart from "~/modern/livechart"

export default {
  data() {
    return {
      lastDraw: "..."
    };
  },
  props: {
    stockid: {
      require: true
    }
  },
  mounted() {
    // socket new api
    this.listenForBroadcast(
      {
        // liveStockData.stockName
        channelName: `roadMap.${this.getStockUUIDByStockName(this.stockid)}.${
          this.getPortalProviderUUID
        }`,
        eventName: "roadMap"
      },
      ({ data }) => {
        try {
          var logData = data;
          if (data.status) {
            let dataIndex = data.data.roadMap[0];
            this.lastDraw = dataIndex.stockValue.replace(",", "");
          } else {
            throw new Error(config.error.general);
          }
        } catch (ex) {
          console.log(ex);
        }
      }
    );
  },
  created() {
    this.fetchChart(this.getStockUUIDByStockName(this.stockid));
  },
  beforeDestroy() {
    window.Echo.leave(
      `roadMap.${this.getStockUUIDByStockName(this.stockid)}.${
        this.getPortalProviderUUID
      }`
    );
  },
  components: {
    betButton,
    chartApp
    // livechart
  },
  computed: {
    ...mapGetters([
      "getGameUUIDByStockName",
      "getStockUUIDByStockName",
      "getPortalProviderUUID",
      "getTimerByStockName",
      "getStockLoop",
      "getAmountBettingByStockId"
    ])
  },
  methods: {
    async fetchChart(stockUUID) {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          limit: 50,
          stockUUID: [stockUUID],
          version: config.version
        };
        var res = await this.$axios.$post(config.getRoadMap.url, reqBody, {
          headers: config.header
        });
        if (res.status) {
          this.lastDraw = res.data[0].roadMap
            .reverse()[0]
            .stockValue.replace(",", "");
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.error(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
      }
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    setAfterFullScreenClosePage() {
      secureStorage.setItem("fullscreenclosed", "multigame");
      this.$router.push(`/modern/fullscreen/${this.stockid}`);
    },
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    }
  }
};
</script>
<style scoped>
.heading {
  color: #013f70;
  font-size: 22px;
}
.totalPrice {
  font-size: 24px;
  margin-left: 50px;
}
.multiplescreen {
  border-top: 10px solid #092a68;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
.multiplefull {
  background-color: #8d31cd !important;
  color: #fff !important;
  border-radius: 180px;
}
.multiplefull .v-icon {
  font-size: 30px;
}
</style>
