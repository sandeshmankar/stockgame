<template>
  <div class="text-xs-center">
    <apexchart
      type="bar"
      :height="chartHeight"
      :options="chartOptions"
      :series="series"
      :key="componentKey"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapGetters } from "vuex";
import config from "../../config/config.global";
import secureStorage from "../../plugins/secure-storage.js";

export default {
  props: ["StockData"],
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      chartHeight: "350vh",
      stockName: this.$route.path.split("/")[3],
      loopName: "",
      window: {
        width: 0,
        height: 0
      },
      series: [
        {
          name: this.$root.$t("gamemsg.big"),
          data: [0, 0, 0, 0],
          betCounts: [0, 0, 0, 0]
        },
        {
          name: this.$root.$t("gamemsg.small"),
          data: [0, 0, 0, 0],
          betCounts: [0, 0, 0, 0]
        },
        {
          name: this.$root.$t("gamemsg.odd"),
          data: [0, 0, 0, 0],
          betCounts: [0, 0, 0, 0]
        },
        {
          name: this.$root.$t("gamemsg.even"),
          data: [0, 0, 0, 0],
          betCounts: [0, 0, 0, 0]
        },
        {
          name: this.$root.$t("gamemsg.high"),
          data: [0, 0, 0, 0],
          betCounts: [0, 0, 0, 0]
        },
        {
          name: this.$root.$t("gamemsg.mid"),
          data: [0, 0, 0, 0],
          betCounts: [0, 0, 0, 0]
        },
        {
          name: this.$root.$t("gamemsg.low"),
          data: [0, 0, 0, 0],
          betCounts: [0, 0, 0, 0]
        },
        {
          name: this.$root.$t("gamemsg.number"),
          data: [0, 0, 0, 0],
          betCounts: [0, 0, 0, 0]
        },
        {
          name: this.$root.$t("gamemsg.tie"),
          data: [0, 0, 0, 0],
          betCounts: [0, 0, 0, 0]
        }
      ],
      componentKey: 0,
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
          type: "bar",
          height: 250,
          stacked: true,
          stackType: "100%"
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: [
            this.$root.$t("gamemsg.firstdigit"),
            this.$root.$t("gamemsg.lastdigit"),
            this.$root.$t("gamemsg.bothdigit"),
            this.$root.$t("gamemsg.twodigit")
          ]
        },
        tooltip: {
          enabled: true,
          followCursor: false,
          intersect: true,
          onDataSetHover: {
            highlightDataSeries: false
          },
          y: {
            formatter: (val, { series, seriesIndex, dataPointIndex, w }) => {
              return (
                '<div class="arrow_box">' +
                `<span> ${this.$root.$t("msg.amount")}: $` +
                series[seriesIndex][dataPointIndex] +
                " </span>" +
                "</div>" +
                '<div class="arrow_box">' +
                `<span> ${this.$root.$t("msg.betCount")}` +
                w.config.series[seriesIndex].betCounts[dataPointIndex] +
                "</span>" +
                "</div>"
              );
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      }
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    if (this.stockName.slice(0, -1) == "btc") {
      this.loopName =
        this.stockName.slice(-1) == 1 ? this.stockName.slice(-1) : "5";
      this.stockName = this.stockName;
    } else {
      this.stockName = this.stockName[3];
      this.loopName = "5";
    }
    this.connectSocket();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    ...mapGetters([
      "getGameUUIDByStockName",
      "getPortalProviderUUID",
      "getStockUUIDByStockName"
    ])
  },
  methods: {
    connectSocket() {
      this.listenForBroadcast(
        {
          channelName: `liveBetCounts.${
            this.getPortalProviderUUID
          }.${this.getStockUUIDByStockName(this.stockName)}.${this.loopName}`,
          eventName: "liveBetCounts"
        },
        ({ data }) => {
          try {
            var logData = data;
            if (data.status) {
              this.series = data.data;
              this.componentKey += 1;
            } else {
              throw new Error(config.error.general);
            }
          } catch (ex) {
            console.log(ex);
          }
        }
      );
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName)
        .listen(eventName, callback)
        .on("pusher:subscription_succeeded", async member => {
          try {
            var reqBody = {
              portalProviderUUID: this.getPortalProviderUUID,
              gameUUID: this.getGameUUIDByStockName(this.$route.params.id),
              version: 1
            };
            var { data } = await this.$axios.post(
              config.liveBetCount.url,
              reqBody,
              {
                headers: config.header
              }
            );
            if (data.status) {
              this.series = data.data;
              this.componentKey += 1;
            } else {
              throw new Error(config.error.general);
            }
          } catch (ex) {
            console.log(ex);
          }
        });
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      // Chart Size Change According Desktop and Laptop Size
      if (this.window.width >= 2000) {
        this.chartHeight = "420vh";
        this.heightChart = 420;
      } else if (this.window.width > 1400) {
        this.chartHeight = "380vh";
        this.heightChart = 380;
      } else {
        this.chartHeight = "300vh";
        this.heightChart = 300;
      }
    }
  }
};
</script>
