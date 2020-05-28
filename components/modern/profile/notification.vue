<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="title_menu">my notification</h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-5 pl-5>
      <v-flex xs12>
        <div class="group_container">
          <span class="group_title">receive by email</span>
          <div class="title_container">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">insufficient balance in an account</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">wining bets</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">losing bets</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">users follw me</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">amount credited or debited to an account</span>
            <br />
          </div>
        </div>
      </v-flex>
      <v-flex xs12>
        <div class="group_container">
          <span class="group_title">receive by message</span>
          <div class="title_container">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">insufficient balance in an account</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">wining bets</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">losing bets</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">users follw me</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">amount credited or debited to an account</span>
            <br />
          </div>
        </div>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import uploadprofile from "./UploadFile";
export default {};
</script>

<style scoped>
.title_menu{
    text-transform: uppercase
}
.titile {
  padding-left: 5px;
}
.group_title {
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
}
.title_container {
  padding-top: 15px;
  padding-bottom: 15px;
  text-transform: capitalize;
}
.title_container span {
  padding-top: 15px;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  color: #353333
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
/* checkbox */

</style>
