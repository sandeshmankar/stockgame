<template>
  <v-dialog
    v-if="dialogStockAnalysis"
    v-model="dialogStockAnalysis"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    light
  >
    <v-card>
      <v-toolbar card dark style="background-color:#2cb13b;">
        <v-layout row justify-center>
          <h2>{{ $t("profile.stockAnalysis") }}</h2>
          <v-spacer></v-spacer>
          <v-icon size="20" @click="dialogStockAnalysis = false">close</v-icon>
        </v-layout>
      </v-toolbar>
      <v-flex
        mt-2
        xs12
        md12
        v-if="$vuetify.breakpoint.xs"
        class="profile_head text-xs-center"
      >
        <div class="image_container">
          <v-avatar :size="90">
            <img :src="imgProfile" alt="img-profile" />
          </v-avatar>
        </div>
        <h3 class="text-capitalize">
          {{ getUserInfo.firstName }} {{ getUserInfo.lastName }}
        </h3>
        <p>
          <strong>{{ $t("profile.onlineStatus") }} :</strong>
          {{ getUserInfo.currentActiveTime }}
        </p>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs12 sm12 pt-3>
        <v-layout row justify-center>
          <v-flex
            xs2
            sm12
            md2
            v-if="!$vuetify.breakpoint.xs"
            class="profile_head text-xs-center"
          >
            <div class="image_container">
              <v-avatar :size="60">
                <img :src="imgProfile" alt="img-profile" />
              </v-avatar>
            </div>
            <h3 class="text-capitalize">
              {{ getUserInfo.firstName }} {{ getUserInfo.lastName }}
            </h3>
            <p>
              <strong>{{ $t("profile.onlineStatus") }} :</strong>
              {{ getUserInfo.currentActiveTime }}
            </p>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-layout row justify-center pa-2>
          <!-- select start date  -->
          <v-flex xs5 sm4 mr-1 ml-1>
            <div class="date_picker_container" @click="startDateClick">
              <div class="title_date_picker">
                <strong>{{ $t("msg.from") }}</strong>
              </div>
              <div class="date_picker">
                <span class="select_date">{{ startDate }}</span>
                <span class="icon_date">
                  <v-icon>date_range</v-icon>
                </span>
              </div>
            </div>
            <div style="position:absolute;z-index:1">
              <v-date-picker
                color="#1db42f"
                v-if="isShowDateStart"
                v-model="startDate"
                :max="maxDate"
                @input="isShowDateStart = false"
              ></v-date-picker>
            </div>
          </v-flex>
          <!-- select end date -->
          <v-flex xs5 sm4 mr-1>
            <div class="date_picker_container" @click="endDateClick">
              <div class="title_date_picker">
                <strong>{{ $t("msg.to") }}</strong>
              </div>
              <div class="date_picker">
                <span class="select_date">{{ endDate }}</span>
                <span class="icon_date">
                  <v-icon>date_range</v-icon>
                </span>
              </div>
            </div>
            <div style="position:absolute;z-index:1">
              <v-date-picker
                color="#1db42f"
                v-if="isShowDateEnd"
                v-model="endDate"
                :max="maxDate"
                @input="isShowDateEnd = false"
              ></v-date-picker>
            </div>
          </v-flex>
          <!-- end of end date -->
          <v-flex xs1 sm1 ml-1 mr-4>
            <div class="date_picker_container">
              <div class="title_date_picker">
                <span></span>
              </div>
              <button @click="getStockAnalysis" class="buttonGreen btn-go">
                {{ $t("msg.go") }}
              </button>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md10 lg10 mt-4 pb-4>
        <v-layout row justify-center>
          <v-flex xs11 sm10>
            <div class="chart_container">
              <div v-if="isDataValid" class="chart-map-color">
                <span v-for="(stock, index) in stocks" :key="index">
                  <span
                    class="circle-color"
                    :style="{ backgroundColor: colors[0][index] }"
                  ></span>
                  <span style="margin-right:10px">{{ stock }}</span>
                </span>
              </div>
              <p class="no-data" v-if="!isDataValid" :key="componentKey">
                <strong>{{ error }}</strong>
              </p>
              <apexchart
                v-if="isDataValid"
                type="bar"
                height="350vh"
                :options="chartOptions"
                :series="series"
                :key="componentKey"
              ></apexchart>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script>
import apexchart from "vue-apexcharts";
import { mapGetters, mapActions } from "vuex";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import config from "~/config/config.global";
import date from "date-and-time";

// set win and lose color in bar chart
let index = 0;
let barColor = [
  ["#67c9d3", "#f75b54", "#fcc624", "#1a237e", "#d81b60", "#ff6f00", "#01579b"], // win color
  ["#81eaf5", "#f9a5a3", "#fddf84", "#7986cb", "#f06292", "#ffb74d", "#90caf9"] // loss color
];
export default {
  components: {
    apexchart: apexchart
  },
  data() {
    return {
      stockAnalysis: [],
      componentKey: 0,
      maxDate: new Date().toISOString(),
      isDataValid: false,
      error: "",
      colors: barColor,
      isShowDateStart: false,
      isShowDateEnd: false,
      startDate: "",
      endDate: "",
      chartOptions: {
        colors: [
          function({ value, seriesIndex, dataPointIndex, w }) {
            if (seriesIndex == 0) {
              return barColor[0][dataPointIndex];
            }
            if (seriesIndex == 1) {
              return barColor[1][dataPointIndex];
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        tooltip: {
          enabled: true,
          followCursor: true,
          intersect: true,
          onDataSetHover: {
            highlightDataSeries: false
          },
          x: {
            show: false
          },
          y: {
            formatter: (val, { series, seriesIndex, dataPointIndex }) => {
              return (
                '<div class="arrow_box ">' +
                "<span> " +
                this.stockAnalysis[dataPointIndex].stockName.toUpperCase() +
                " </span>" +
                "<span> " +
                series[seriesIndex][dataPointIndex] +
                "</span>" +
                "</div>"
              );
            },
            title: {
              formatter: function(seriesName) {
                return seriesName.toUpperCase();
              }
            }
          }
        },
        xaxis: {
          labels: {
            offsetX: 0
          }
        }
      },
      dialogStockAnalysis: false
    };
  },
  methods: {
    ...mapActions(["setSnackBarMessage"]),
    showDialogStockAnalysis() {
      this.$forceUpdate();
      this.dialogStockAnalysis = true;
      this.componentKey++;
      this.getStockAnalysis();
    },
    showDialogOnlineHistory() {
      this.dialogOnlineHistory = true;
    },
    checkValidDate(startDate, endDate) {
      const now = date.format(new Date(), "YYYY-MM-DD");
      if (endDate > now || !(endDate >= startDate)) {
        return false;
      }
      return true;
    },
    startDateClick() {
      this.isShowDateStart = !this.isShowDateStart;
      this.isShowDateEnd = false;
    },
    endDateClick() {
      this.isShowDateEnd = !this.isShowDateEnd;
      this.isShowDateStart = false;
    },
    async getStockAnalysis() {
      try {
        if (!this.checkValidDate(this.startDate, this.endDate)) {
          this.setSnackBarMessage("Please select a valid date");
        }
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          dateRangeFrom: this.startDate,
          dateRangeTo: this.endDate,
          version: config.version
        };
        const res = await this.$axios.$post(
          config.getUserBetAnalysis.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.code == 200) {
          if (res.data.length) {
            this.isDataValid = true;
            this.error = "";
            this.stockAnalysis = res.data;
          } else {
            this.isDataValid = false;
            this.error = this.$root.$t("profile.noData");
            // this.setSnackBarMessage("No Data to Display");
          }
        } else {
          this.setSnackBarMessage(res.message[0]);
        }
      } catch (ex) {
        this.setSnackBarMessage(ex.message);
        this.isDataValid = false;
      }
    }
  },
  created() {
    const now = date.format(new Date(), "YYYY-MM-DD");
    const lastWeek = date.addDays(new Date(), -7);
    this.startDate = date.format(lastWeek, "YYYY-MM-DD");
    this.endDate = now;
    this.getStockAnalysis();
  },
  computed: {
    ...mapGetters([
      "getUserInfo",
      "getPortalProviderUUID",
      "getUserUUID",
      "getUserInfo"
    ]),
    stocks() {
      let stocks = [];
      this.stockAnalysis.forEach(element => {
        stocks.push(element.stockName);
      });
      return stocks;
    },
    series() {
      let win = [];
      let loss = [];
      this.stockAnalysis.forEach(element => {
        win.push(element.winCount);
        loss.push(element.lossCount);
      });
      return [
        {
          name: this.$root.$t("msg.win"),
          data: win
        },
        {
          name: this.$root.$t("msg.lose"),
          data: loss
        }
      ];
    },
    imgProfile() {
      return this.getUserInfo.profileImage == "" ||
        this.getUserInfo.profileImage == undefined
        ? "/no-profile-pic.jpg"
        : `${config.apiDomain}/` + this.getUserInfo.profileImage;
    }
  },
  destroyed() {
    index = 0; // reset index
  },
  updated() {
    index = 0; // reset index
  }
};
</script>

<style scoped>
.btn-go {
  width: 45px !important;
  height: 42px !important;
  font-size: 16px !important;
}

li {
  list-style-type: none;
}

.chart-map-color {
  position: relative;
  float: right;
  margin-top: 15px;
  display: inline-block;
}

.circle-color {
  position: relative;
  display: inline-block;
  top: 2px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

button {
  background-color: green;
  padding: 10px;
  width: 60px;
  color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
}

button:focus {
  outline: none;
}

.title_menu {
  padding-bottom: 15px;
  text-transform: capitalize;
  color: #353333;
}

.date_picker_container {
  text-transform: capitalize;
  cursor: pointer;
}

.chart_container {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 6px;
  width: 100%;
  height: 400px;
}

.date_picker {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 10px;
  position: relative;
  width: 120px;
}

.title_date_picker {
  padding-left: 10px;
  padding-bottom: 5px;
  color: #353333;
  text-transform: uppercase;
  min-height: 30px;
}

.icon_date {
  float: right;
  margin-top: -2px;
}

.select_date {
  text-transform: uppercase;
}

.no-data {
  color: red;
  text-align: center;
  align-content: center;
}
</style>
