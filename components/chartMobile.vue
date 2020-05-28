<template>
  <div>
    <apexchart
      type="area"
      width="100%"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { Line, mixins } from "vue-chartjs";
import VueCharts from "vue-chartjs";
import Chart from "chart.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Echo from "laravel-echo";
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
          var logData = data;
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
  components: {
    apexchart: VueApexCharts
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getStockUUIDByStockName"]),
    chartOptions() {
      let newTime = [];
      this.chartData.forEach(element => {
        newTime.push(element.stockTimeStamp);
      });
      return {
        tooltip: {
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            return (
              '<div class="arrow_boxChart"> $' +
              series[seriesIndex][dataPointIndex].toFixed(2) +
              "</div>"
            );
          }
        },
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: "#0b2a68",
              opacity: 0.3
            },
            stroke: {
              color: "#0b2a68",
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
          background: "#fff",
          parentHeightOffset: 0,
          height: 200,
          zoom: {
            enabled: false
          },
          toolbar: {
            shared: false,
            y: {
              formatter: function(val) {
                return (val / 1000000).toFixed(0);
              }
            }
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
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1,
          dashArray: 0
        },
        grid: {
          row: {
            colors: ["#fff", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: newTime,
          show: false,
          labels: {
            show: false
          }
        },
        yaxis: {
          show: true,
          labels: {
            show: true
          }
        }
      };
    },
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
    }
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
          this.apiAttemptCount = 0;
          let readyData = res.data[0].roadMap.reverse();
          this.chartData = readyData;
        } else {
          if (this.apiAttemptCount < 3) {
            this.apiAttemptCount++;
            this.fetchChart(stockUUID);
          } else {
            throw new Error(config.error.general);
          }
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
      chartData: [],
      apiAttemptCount: 0
    };
  }
};
</script>

<style>
.arrow_boxChart {
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid #003f70;
  border-radius: 5px;
  font-weight: 600;
  padding: 3px 10px;
  font-size: 18px;
  color: #fff;
  background: #003f70 !important  ;
}
.stockPrice {
  padding-right: 14px;
  color: green;
  font-size: 24px;
  margin: 0px;
  font-weight: 600;
}

.stockTimer {
  padding-left: 20px;
  color: #333;
  font-size: 20px;
  margin: 0px;
  font-weight: 600;
}
</style>
