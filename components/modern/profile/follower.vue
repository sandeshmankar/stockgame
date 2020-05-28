<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="title_menu">my followers</h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-5 pl-5>
      <v-layout row pb-4>
        <v-flex xs3>
          <div class="input-container">
            <input type="text" placeholder="search by name" />
            <span class="icon-container-search">
              <v-icon :size="20" color="#bdbdbd">search</v-icon>
            </span>
          </div>
        </v-flex>
        <v-flex xs3>
          <div class="input-container">
            <select id="country" name="country">
              <option value="australia">Australia</option>
              <option value="canada">Canada</option>
              <option value="usa">USA</option>
            </select>
            <span class="icon-container">
              <v-icon :size="20" color="#bdbdbd">arrow_drop_down</v-icon>
            </span>
          </div>
        </v-flex>
        <v-flex xs3>
          <div class="input-container">
            <select id="country" name="country">
              <option value="australia">Australia</option>
              <option value="canada">Canada</option>
              <option value="usa">USA</option>
            </select>
            <span class="icon-container">
              <v-icon :size="20" color="#bdbdbd">arrow_drop_down</v-icon>
            </span>
          </div>
        </v-flex>
        <v-flex xs3 pt-1>
          <button class="btn_go">go</button>
        </v-flex>
      </v-layout>

      <v-flex xs10>
        <div class="filter_container">
          <span class="filter-title">Filter by:</span>
          <span class="tag">
            5555
            <span class="close-icon">X</span>
          </span>
          <span class="tag">5555</span>
          <span class="tag">5555</span>
          <span class="tag">5555</span>
        </div>
        <div class="title_container">
          <div class="follower_container">
            <span>User allow to visit my profile</span>
            <span class="span_center">us index dollar</span>
            <span>stock name</span>
            <button class="btn_follow">follow</button>
          </div>
          <div class="follower_container">
            <span>User allow to visit my profile</span>
            <span class="span_center">us index dollar</span>
            <span>stock name</span>
            <button class="btn_follow">follow</button>
          </div>
          <div class="follower_container">
            <span>User allow to visit my profile</span>
            <span class="span_center">us index dollar</span>
            <span>stock name</span>
            <button class="btn_follow btn_unfollow">unfollow</button>
          </div>
          <div class="follower_container">
            <span>User allow to visit my profile</span>
            <span class="span_center">us index dollar</span>
            <span>stock name</span>
            <button class="btn_follow btn_following">following</button>
          </div>
          <div class="follower_container">
            <span>User allow to visit my profile</span>
            <span class="span_center">us index dollar</span>
            <span>stock name</span>
            <button class="btn_follow">follow</button>
          </div>
          <div class="follower_container">
            <span>User allow to visit my profile</span>
            <span class="span_center">us index dollar</span>
            <span>stock name</span>
            <button class="btn_follow btn_following">following</button>
          </div>
          <div class="follower_container">
            <span>User allow to visit my profile</span>
            <span class="span_center">us index dollar</span>
            <span>stock name</span>
            <button class="btn_follow">follow</button>
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
.title_menu {
  text-transform: uppercase;
}
.titile {
  padding-left: 5px;
}
.filter_container{
    margin-bottom:30px
}
.filter-title {
  font-weight: bold;
  /* font-size: 18px;
  text-transform: uppercase; */
}
.title_container {
  padding-top: 15px;
  padding-bottom: 15px;
  text-transform: capitalize;
}
.follower_container {
  background-color: white;
  margin-left: 5px;
  margin-bottom: 15px;
  position: relative;
  width: 90%;
  padding: 10px;
  padding-left: 15px;
  border-width: 1px;
  border-style: solid;
  border-color: #bdbec1;
  border-radius: 10px;
}
.btn_follow {
  position: relative;
  float: right;
  font-weight: bold;
  bottom: 4px;
  width: 130px;
  padding: 4px 0px;
  color: #fff;
  text-transform: uppercase;
  background: linear-gradient(to right, #25b175 19%, #2cb121 70%);

  border-radius: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
}
.btn_unfollow {
  background: linear-gradient(to right, #898888 19%, #626161 70%);
}
.btn_following {
  background: linear-gradient(to right, #51c6b8 19%, #73d07f 70%);
}
.input-container {
  position: relative;
}
input[type="text"],
select {
  width: 90%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 15px;
  resize: vertical;
  background-color: white;
}
input[type="text"] {
  padding-left: 35px;
}
select {
  padding-right: 35px;
}
.icon-container {
  position: absolute;
  top: 14px;
  right: 45px;
}
.icon-container-search {
  position: absolute;
  left: 10px;
  top: 14px;
}
select {
  cursor: pointer;
}
button:focus,
input:focus,
select:focus {
  outline: none;
}
.btn_go {
  background-color: green;
  padding: 10px;
  width: 60px;
  color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
  text-transform: uppercase;
}
span.tag {
  position: relative;
  color: black;
  /* font-size: 12px; */
  border: 1px solid #cfcfd2;
  border-radius: 5px;
  padding: 2px 10px;
  margin-right: 15px;
}
.close-icon {
  position: absolute;
  border: 1px solid #cfcfd2;
  color: #cfcfd2;
  font-size: 8px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: -5px;
  right: -8px;
  text-align: center;
  background-color: white;
  font-weight: 900;
  cursor: pointer;
}

.span_center {
  margin: 0px 80px;
}
</style>
