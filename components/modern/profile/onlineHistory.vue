<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="title_menu">online history</h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-3 pl-5>
      <v-layout row>
        <!-- select start date  -->
        <v-flex xs6 sm6 md3 lg3 pr-5>
          <div class="date_picker_container" @click="isShowDateStart = !isShowDateStart">
            <div class="title_date_picker">
              <span>from</span>
            </div>
            <div class="date_picker">
              <span class="select_date">{{startDate}}</span>
              <span class="icon_date">
                <v-icon>date_range</v-icon>
              </span>
            </div>
          </div>
          <div style="position:absolute;z-index:1">
            <v-date-picker
              v-if="isShowDateStart"
              v-model="startDate"
              @input="isShowDateStart = false"
            ></v-date-picker>
          </div>
        </v-flex>
        <!-- select end date -->
        <v-flex xs6 sm6 md3 lg3 pr-5>
          <div class="date_picker_container" @click="isShowDateEnd = !isShowDateEnd">
            <div class="title_date_picker">
              <span>to</span>
            </div>
            <div class="date_picker">
              <span class="select_date">{{endDate}}</span>
              <span class="icon_date">
                <v-icon>date_range</v-icon>
              </span>
            </div>
          </div>
          <div style="position:absolute;z-index:1">
            <v-date-picker v-if="isShowDateEnd" v-model="endDate" @input="isShowDateEnd = false"></v-date-picker>
          </div>
        </v-flex>
        <!-- go button -->
        <v-flex xs6 sm6 md2 lg1>
          <div class="date_picker_container">
            <div class="title_date_picker">
              <span></span>
            </div>
            <button class="buttonGreen">GO</button>
          </div>
        </v-flex>
        <v-flex xs6 sm6 md3 lg3 pl-5>
          <div class="date_picker_container">
            <div class="title_date_picker">
              <span>Sort By</span>
            </div>
            <div class="date_picker">
              <!-- sort by  -->
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <span class="select_date">2020-02-12</span>
                  <span class="icon_date">
                    <v-icon v-on="on">arrow_drop_down</v-icon>
                  </span>
                </template>
                <v-list>
                  <v-list-tile v-for="(item, index) in items" :key="index">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm12 md10 lg10 class="pt-5 pl-5 pr-5">
      <div class="chart_container">
        <onlineChart v-if="chartData.length>0" :chartData="chartData" :xaxis="xaxis" />
      </div>
    </v-flex>
    <v-flex xs12 class="pt-3 pl-5">
      <div>
        <span style="margin-right:30px">
          player id :
          <b>{{getUserInfo.PID}}</b>
        </span>
        <span style="margin-right:30px">
          online time : {{getUserInfo.currentActiveTime}}
          <b>{{asynUserInfo.currentActiveTime}}</b>
        </span>
        <span style="margin-right:30px">
          total online :
          <b>2day,15hours,11minute</b>
        </span>
      </div>
    </v-flex>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import uploadprofile from "./UploadFile";
import onlineChart from "./onlinechart";
import config from '../../../config/config.global';
export default {
  components: {
    onlineChart
  },
  data() {
    return {
      chartData: [],
      xaxis: [],
      isShowDateStart: false,
      isShowDateEnd: false,
      startDate: "",
      endDate: "",
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ]
    };
  },
  created() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    this.startDate = yyyy + "-" + mm + "-" + dd;
    this.endDate = yyyy + "-" + mm + "-" + dd;
  },
  mounted() {
    // this.asynUserInfo();
    this.getOnlineHistory();
  },

  computed: {
    ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"])
  },
  methods: {
    ...mapActions(["asynUserInfo"]),
    async getOnlineHistory() {
      try {
        const res = await this.$axios.$post(
          config.getUserProfile.url,
          {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            version: config.version,
            dateRangeFrom: "2020-02-02",
            dateRangeTo: "2020-02-28"
          },
          {
            headers: {
              Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
            }
          }
        );
        if (res.code === 200) {
          this.chartData = [1500];
          this.xaxis = ["2020-02-26"];
          let result = res.data[0].activeTimeDateWise;
          console.log("result online chart");
          console.log(res);
          console.log("result online chart");
          result.forEach(element => {
            this.chartData.push(parseInt(element.activeTimeInMins));
            this.xaxis.push(element.Date);
          });
          console.log(this.chartData);
          console.log(this.xaxis);
        } else {
          console.log(res);
          alert(res.message);
        }
      } catch (ex) {
        console.error(ex);
        alert(ex.message);
      }
    }
  }
};
</script>

<style scoped>
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
  border-radius: 10px;
  width: 100%;
  height: 420px;
}
.date_picker {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 10px;
  position: relative;
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
</style>
