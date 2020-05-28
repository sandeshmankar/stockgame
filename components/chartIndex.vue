<template>
  <div>
    <apexchart
      type="area"
      width="100%"
      height="100%"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import Echo from "laravel-echo";
import { mapGetters, mapMutations, mapActions } from "vuex";
import config from "~/config/config.global";
import secureStorage from "../plugins/secure-storage";

export default {
  props: {
    height: {
      type: String,
      default: "auto"
    },
    stockName: {
      type: String,
      required: true
    }
  },
  components: {
    apexchart: VueApexCharts
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getStockUUIDByStockName"]),
    series() {
      let newData = [];
      this.chartData.forEach(element => {
        newData.push(element.stockValue);
      });
      return [
        {
          name: "Price",
          data: newData
        }
      ];
    },
    chartOptions() {
      let newTime = [];
      this.chartData.forEach(element => {
        newTime.push(element.stockTimeStamp);
      });
      return {
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: "#90CAF9",
              opacity: 0.4
            },
            stroke: {
              color: "#0D47A1",
              opacity: 0.4,
              width: 1
            }
          }
        },
        plotOptions: {
          line: {
            lineHeight: "100%",
            horizontal: true // <---- "true" flip the axis, "100" is not shown anymore
          }
        },
        chart: {
          parentHeightOffset: 0,
          height: 600,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        brush: {
          target: "chartArea",
          enabled: true
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          //   curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1,
          dashArray: 0
        },
        grid: {
          padding: {
            left: 0,
            right: 0,
            top: -30,
            bottom: -35
          },
          show: false
        },
        xaxis: {
          show: false,
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          show: false,
          labels: {
            show: false
          }
          // tickAmount: 3
          // min: Math.max(...this.data)+10,
          // max: Math.min(...this.data)+10,
        }
      };
    }
  },
  created() {
    this.fetchChart(this.getStockUUIDByStockName(this.stockName));
  },
  beforeDestroy() {
    window.Echo.leave(
      `roadMap.${this.getStockUUIDByStockName(this.stockName)}.${
        this.getPortalProviderUUID
      }`
    );
  },
  mounted() {
    // socket new api
    this.listenForBroadcast(
      {
        // liveStockData.stockName
        channelName: `roadMap.${this.getStockUUIDByStockName(this.stockName)}.${
          this.getPortalProviderUUID
        }`,
        eventName: "roadMap"
      },
      ({ data }) => {
        try {
          var logData = data.data;
          if (data.status) {
            let dataIndex = data.data.roadMap[0];
            let readyData = {
              stockValue: dataIndex.stockValue.replace(",", ""),
              stockTimeStamp: dataIndex.stockTimeStamp,
              number1: dataIndex.number1,
              number2: dataIndex.number2
            };

            if (
              dataIndex.stockTimeStamp !==
              this.chartData[this.chartData.length - 1].stockTimeStamp
            ) {
              this.setLiveChart(readyData);
            }
          } else {
            throw new Error(config.error.general);
          }
        } catch (ex) {
          console.log(ex);
        }
      }
    );
  },
  methods: {
    setLiveChart(payload) {
      this.chartData.push(payload);
    },
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
          let readyData = res.data[0].roadMap.reverse();
          this.chartData = readyData;
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
    }
  },
  data() {
    return {
      chartData: []
    };
  }
};
</script>
